// src/app/services/map.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private geocodeUrl = 'https://api.openrouteservice.org/geocode/search';
  private directionsUrl = 'https://api.openrouteservice.org/v2/directions/driving-car';
  private apiKey = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImZiYjdhMTcxOTkzYTQ0NDhiNGVkNzFlMTA5YzFkZTIzIiwiaCI6Im11cm11cjY0In0='; // ⚠️ reemplaza con tu clave

  constructor(private http: HttpClient) {}

  // 1. Geocodificación: dirección → coordenadas
  getCoordinates(address: string): Observable<[number, number]> {
    return this.http.get<any>(this.geocodeUrl, {
      params: { api_key: this.apiKey, text: address }
    }).pipe(
      map(res => res.features[0].geometry.coordinates) // [lon, lat]
    );
  }

  // 2. Ruta entre 2 coordenadas
  getRoute(start: [number, number], end: [number, number]): Observable<any> {
    const body = { coordinates: [start, end] };
    return this.http.post(this.directionsUrl, body, {
      headers: { Authorization: this.apiKey }
    });
  }
}
