import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Donacion {
  id_Donacion?: number;
  desc_Donacion: string;
  cantidad_Donacion: number;
  fecha_Donacion: string;
  estado_Donacion: number;
  usuarioId: { id: number };
  peticionId: { id_peticion: number };
  categoriaId: number;
  direccion: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class DonacionService {
  private UrlAPI = 'http://localhost:8080/Donacion';

  constructor(private http: HttpClient) {}

  getDonaciones(): Observable<Donacion> {
    return this.http.get<Donacion>(`${this.UrlAPI}/todos`);
  }

  crearDonacion(donacion: Donacion): Observable<Donacion> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('client:123456'),
    });
    return this.http.post<Donacion>(`${this.UrlAPI}/crear-Donacion`, donacion, {headers});
  }
}
