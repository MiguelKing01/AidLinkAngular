export interface Order {
    id: string;
    fecha: string;            // "YYYY-MM-DD" (valor del input date)
    origen: string;
    destino: string;
    slotStart: string;        // "HH:MM"
    slotEnd: string;          // "HH:MM"
    slotLabel?: string;       // e.g. "Mañana (08:00-12:00)"
    distanceM: number;        // metros (desde ORS)
    durationSec: number;      // segundos (desde ORS)
    createdAt: string;        // ISO string
    scheduledStartAt?: string;// ISO string - cuando se espera que se "envíe"
    sentAt?: string;          // ISO string - cuando realmente se marcó enviado
    receivedAt?: string;      // ISO string - cuando se marcó recibido
    status: 'pendiente'|'enviado'|'recibido';
  }
  