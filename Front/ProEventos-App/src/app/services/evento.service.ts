import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Evento } from '../models/Evento';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  eventos: Object = new Object();
  baseURL = 'http://localhost:5000/api/Evento';
  tokenHeader: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {}

  getAllEvento(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseURL, { headers: this.tokenHeader });
  }

  getEventosByTema(tema: string) : Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseURL}/tema/${tema}`);
  }

  getEventoById(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseURL}/${id}`);
  }






}
