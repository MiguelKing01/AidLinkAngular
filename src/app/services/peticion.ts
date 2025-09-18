import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Peticion {

  id_Peticion?: number;
  nombre_Peticion: String;
  desc_Peticion: String;
  cantidad_Peticion: String;
  fecha_Peticion: Date;
  estado_Peticion: number;
  usuario: {Id: number};
  categoria: {id: number};
}

@Injectable({
  providedIn: 'root'
})

export class PeticionService{
  private apiURL = 'http://localhost:8080/Peticion';

  constructor(private http:HttpClient){}

  getPeticion(): Observable<Peticion[]>{
    return this.http.get<Peticion[]>(`${this.apiURL}/todos`);
  }
}
