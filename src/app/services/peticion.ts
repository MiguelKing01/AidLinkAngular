import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Peticion {
  id?: number;
  nombre_peticion: string;
  desc_peticion: string;
  cantidad_peticion: number;
  fecha_peticion: String; 
  estado_peticion: number;
  direccion: string | null;
  nequi: number | null;
  usuario: {id: number};
  categoriaId: number; 
  // usuario: {
  //   id: number;
  //   nombre?: string;
  //   apellido?: string;
  //   correo?: string;
  //   contrasena?: string;
  // };
  // categoriaId: number;
}

@Injectable({
  providedIn: 'root',
})
export class PeticionService {
  private apiURL = 'http://localhost:8080/Peticion';

  constructor(private http: HttpClient) {}

  getPeticion(): Observable<Peticion> {
    return this.http.get<Peticion>(`${this.apiURL}/todos`);
  }

  crearPeticion(peticion: Peticion): Observable<Peticion[]> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('client:123456'),
    });
    return this.http.post<Peticion[]>(`${this.apiURL}/crear-Peticion`, peticion, { headers });
  }

  getPeticionId(id: number): Observable<Peticion[]> {
    return this.http.get<Peticion[]>(`${this.apiURL}/${id}`);
  }

  actualizarPeticion(peticion: Peticion): Observable<Peticion> {
    return this.http.put<Peticion>(`${this.apiURL}/actualizar`, peticion);
  }
}
