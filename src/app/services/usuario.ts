import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Usuario {
  id?: number;
  nombre: String;
  apellido: String;
  correo: String;
  contrasena: String;
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/Usuario';

  private usuarioIdActual: number = 0;

  constructor(private http: HttpClient) {}

  getUsuario(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/todos`, { withCredentials: true });
  }

  crearUsuario(usuario: Usuario): Observable<Usuario[]> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('client:123456'),
    });
    return this.http.post<Usuario[]>(`${this.apiUrl}/crear`, usuario, { headers });
  }

  getUsuarioId(id: number): Observable<Usuario> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('client:123456'),
    });
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`, { headers, withCredentials: true });
  }

  actualizarUsuario(usuario: Usuario): Observable<Usuario> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('client:123456'),
    });
    return this.http.put<Usuario>(`${this.apiUrl}/actualizar`, usuario, {
      headers,
      withCredentials: true,
    });
  }

  setUsuarioId(id: number) {
    this.usuarioIdActual = id;
  }

  getUsuarioIdActual(): number {
    return this.usuarioIdActual;
  }
}
