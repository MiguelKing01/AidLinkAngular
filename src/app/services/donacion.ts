import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Donacion {
  id?: number;
  desc_Donacion: string;
  cantidad_Donacion: Number;
  fecha_Donacion: String;
  estado_Donacion: number;
  direccion: String | null;
  usuario: { id: number };
  peticion: { id: number };
  categoriaId: number;
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

  crearDonacion(donacion: Donacion): Observable<Donacion[]> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('client:123456'),
    });
    return this.http.post<Donacion[]>(`${this.UrlAPI}/crear-Donacion`, donacion, {headers});
  }
}
