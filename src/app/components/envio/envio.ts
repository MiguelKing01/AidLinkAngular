// src/app/components/envio/envio.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapService } from '../../services/map.service';
import { FormsModule } from '@angular/forms';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Header2 } from '../header2/header2';

@Component({
  selector: 'app-envio',
  standalone: true,
  imports: [CommonModule, FormsModule, Header2, Footer ],
  templateUrl: './envio.html',
  styleUrls: ['./envio.css'],
})
export class Envio {
  origen: string = '';
  destino: string = '';
  fecha: string = '';
  distancia: number | null = null;
  duracion: number | null = null;
  cargando = false;

  constructor(private mapService: MapService) {}

  calcularRuta() {
    this.cargando = true;
    this.distancia = null;
    this.duracion = null;

    this.mapService.getCoordinates(this.origen).subscribe({
      next: (start) => {
        this.mapService.getCoordinates(this.destino).subscribe({
          next: (end) => {
            this.mapService.getRoute(start, end).subscribe({
              next: (data) => {
                const summary = data.routes[0].summary;
                this.distancia = summary.distance / 1000; 
                this.duracion = summary.duration / 60;
                this.cargando = false;
              },
              error: () => {
                alert('Error al obtener la ruta');
                this.cargando = false;
              }
            });
          },
          error: () => {
            alert('No se encontró la dirección destino');
            this.cargando = false;
          }
        });
      },
      error: () => {
        alert('No se encontró la dirección origen');
        this.cargando = false;
      }
    });
  }
}
