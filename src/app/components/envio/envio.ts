import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid'; // npm i uuid
import { MapService } from '../../services/map.service'; // tu servicio ORS
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { Header2 } from '../header2/header2';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-envio',
  standalone: true,
  imports: [CommonModule, FormsModule, Header2, Footer],
  templateUrl: './envio.html',
  styleUrls: ['./envio.css'],
})
export class Envio implements OnInit, OnDestroy {
  fecha = '';
  selectedSlot: { label: string, start: string, end: string } | null = null;
  customStart = '';
  customEnd = '';
  origen = '';
  destino = '';
  message = '';

  predefinedSlots = [
    { label: 'Mañana (08:00-12:00)', start: '08:00', end: '12:00' },
    { label: 'Tarde (12:00-18:00)', start: '12:00', end: '18:00' },
    { label: 'Noche (18:00-22:00)', start: '18:00', end: '22:00' }
  ];

  pedidos: Order[] = [];
  private timers = new Map<string, number>(); // map orderId -> timeoutId
  private checkerId: any;

  constructor(private mapService: MapService, private orderService: OrderService) {}

  ngOnInit() {
    this.pedidos = this.orderService.getAll();
    // re-evaluar y programar timers para pedidos existentes
    this.pedidos.forEach(p => this.evaluateAndSchedule(p));
    // comprobador periódico por si hubo cierre de app (cada 30s)
    this.checkerId = setInterval(() => this.revalidateAll(), 30_000);
  }

  ngOnDestroy() {
    clearInterval(this.checkerId);
    this.timers.forEach(id => clearTimeout(id));
  }

  async crearPedido() {
    // validaciones básicas
    if (!this.fecha || !this.origen || !this.destino || (!this.selectedSlot && (!this.customStart || !this.customEnd))) {
      this.message = 'Complete todos los campos.';
      return;
    }
    this.message = 'Creando pedido...';

    // determinar franja
    const slotStart = this.selectedSlot ? this.selectedSlot.start : this.customStart;
    const slotEnd = this.selectedSlot ? this.selectedSlot.end : this.customEnd;
    const slotLabel = this.selectedSlot ? this.selectedSlot.label : 'Personalizada';

    try {
      // 1) obtener coordenadas y ruta para duración y distancia
      const originCoords = await this.mapService.getCoordinates(this.origen).toPromise();
      const destCoords = await this.mapService.getCoordinates(this.destino).toPromise();
      if (!originCoords || !destCoords) {
        throw new Error('Unable to fetch coordinates for origin or destination.');
      }
      const route = await this.mapService.getRoute(originCoords, destCoords).toPromise();

      const durationSec = route?.features?.[0]?.properties?.summary?.duration ?? route?.routes?.[0]?.summary?.duration;
      const distanceM = route?.features?.[0]?.properties?.summary?.distance ?? route?.routes?.[0]?.summary?.distance;

      const now = new Date();
      const createdAt = now.toISOString();

      // decide estado y programaciones
      let status: Order['status'];
      let scheduledStartAt: string | undefined;
      let sentAt: string | undefined;
      let receivedAt: string | undefined;

      if (isNowInSlot(this.fecha, slotStart, slotEnd)) {
        // ya está dentro de la franja => enviado
        status = 'enviado';
        sentAt = now.toISOString();
        // calcular receivedAt = sentAt + duration
        const rec = new Date(now.getTime() + (durationSec * 1000));
        receivedAt = rec.toISOString();
      } else {
        // no estamos en la franja
        // calcular la próxima hora de inicio (en la fecha seleccionada o siguiente día)
        const slotStartDate = combineDateAndTime(this.fecha, slotStart);
        if (slotStartDate > now) {
          scheduledStartAt = slotStartDate.toISOString();
        } else {
          // si ya pasó hoy -> programar al siguiente día
          const next = new Date(slotStartDate.getTime());
          next.setDate(next.getDate() + 1);
          scheduledStartAt = next.toISOString();
        }
        status = 'pendiente';
      }

      const order: Order = {
        id: uuidv4(),
        fecha: this.fecha,
        origen: this.origen,
        destino: this.destino,
        slotStart,
        slotEnd,
        slotLabel,
        distanceM: distanceM ?? 0,
        durationSec: durationSec ?? 0,
        createdAt,
        scheduledStartAt,
        sentAt,
        receivedAt,
        status
      };

      // persistir y programar
      this.orderService.add(order);
      this.pedidos.push(order);
      this.evaluateAndSchedule(order);

      this.message = 'Pedido creado correctamente.';
      // limpiar inputs si quieres:
      this.origen = this.destino = '';
      // no borramos la fecha/slot por conveniencia
    } catch (err) {
      console.error(err);
      this.message = 'Error al crear pedido (revisa consola)';
    }
  }

  // re-evalúa un pedido y programa timeouts
  private evaluateAndSchedule(order: Order) {
    // limpiar timers previos
    const existing = this.timers.get(order.id);
    if (existing) {
      clearTimeout(existing);
      this.timers.delete(order.id);
    }

    const now = new Date();

    if (order.status === 'pendiente') {
      if (order.scheduledStartAt) {
        const scheduled = new Date(order.scheduledStartAt);
        // si scheduled ya pasó, cambiar a enviado ahora
        if (scheduled <= now) {
          order.status = 'enviado';
          order.sentAt = now.toISOString();
          const rec = new Date(now.getTime() + order.durationSec * 1000);
          order.receivedAt = rec.toISOString();
          this.orderService.update(order);
          // programar recibo
          const delayRec = rec.getTime() - now.getTime();
          const t = window.setTimeout(() => {
            order.status = 'recibido';
            order.receivedAt = new Date().toISOString();
            this.orderService.update(order);
          }, delayRec);
          this.timers.set(order.id, t);
        } else {
          // programar inicio de envío
          const delayStart = scheduled.getTime() - now.getTime();
          const tStart = window.setTimeout(() => {
            // al iniciar la franja
            order.status = 'enviado';
            order.sentAt = new Date().toISOString();
            const rec = new Date(Date.parse(order.sentAt) + order.durationSec * 1000);
            order.receivedAt = rec.toISOString();
            this.orderService.update(order);

            // programar recibo
            const delayRec = rec.getTime() - Date.now();
            const tRec = window.setTimeout(() => {
              order.status = 'recibido';
              order.receivedAt = new Date().toISOString();
              this.orderService.update(order);
            }, delayRec);
            this.timers.set(order.id + '_rec', tRec);
          }, delayStart);
          this.timers.set(order.id, tStart);
        }
      } else {
        // si no hay scheduledStartAt — recalcula -> next occurrence
        const next = nextSlotStartDate(order.fecha, order.slotStart);
        order.scheduledStartAt = next.toISOString();
        this.orderService.update(order);
        this.evaluateAndSchedule(order); // recursivo para programar
      }
    } else if (order.status === 'enviado') {
      // si está enviado pero tal vez fue enviado hace tiempo; ver si ya debe ser recibido
      const sent = order.sentAt ? new Date(order.sentAt) : null;
      if (!sent) {
        // marcarlo enviado ahora
        order.sentAt = new Date().toISOString();
        this.orderService.update(order);
      }
      const recTime = new Date(Date.parse(order.sentAt!) + order.durationSec * 1000);
      if (recTime <= now) {
        order.status = 'recibido';
        order.receivedAt = recTime.toISOString();
        this.orderService.update(order);
      } else {
        const delay = recTime.getTime() - now.getTime();
        const t = window.setTimeout(() => {
          order.status = 'recibido';
          order.receivedAt = new Date().toISOString();
          this.orderService.update(order);
        }, delay);
        this.timers.set(order.id, t);
      }
    }
    // si ya es recibido no programamos nada
  }

  // revalida todos los pedidos (por ejemplo cada 30s)
  private revalidateAll() {
    this.pedidos = this.orderService.getAll();
    this.pedidos.forEach(p => this.evaluateAndSchedule(p));
  }
}

// helpers (puedes moverlos a un archivo util)
function combineDateAndTime(dateStr: string, timeStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  const [hh, mm] = timeStr.split(':').map(Number);
  return new Date(y, m - 1, d, hh, mm, 0, 0);
}

function isNowInSlot(dateStr: string, start: string, end: string): boolean {
  const now = new Date();
  const startDate = combineDateAndTime(dateStr, start);
  const endDate = combineDateAndTime(dateStr, end);
  if (endDate <= startDate) { // pasa la medianoche
    const tomorrowEnd = new Date(endDate.getTime());
    tomorrowEnd.setDate(tomorrowEnd.getDate() + 1);
    return now >= startDate || now <= tomorrowEnd;
  }
  return now >= startDate && now <= endDate;
}

function nextSlotStartDate(dateStr: string, timeStr: string): Date {
  const slot = combineDateAndTime(dateStr, timeStr);
  const now = new Date();
  if (slot > now) return slot;
  const res = new Date(slot.getTime());
  res.setDate(res.getDate() + 1);
  return res;
}
