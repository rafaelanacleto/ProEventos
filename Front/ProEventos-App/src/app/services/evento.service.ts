import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { Evento } from '../models/Evento';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  eventos: Object = new Object();
  baseURL = 'https://localhost:5001/api/Evento';
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

  public post(evento: Evento): Observable<Evento> {
    return this.http
      .post<Evento>(this.baseURL, evento)
      .pipe(take(1));
  }

  public put(evento: Evento): Observable<Evento> {
    return this.http
      .put<Evento>(`${this.baseURL}/${evento.id}`, evento)
      .pipe(take(1));
  }

  public deleteEvento(id: number): Observable<any> {
    return this.http
      .delete(`${this.baseURL}/${id}`)
      .pipe(take(1));
  }

  postUpload(eventoId: number, file: File): Observable<Evento> {
    const fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUpload);

    return this.http
      .post<Evento>(`${this.baseURL}/upload-image/${eventoId}`, formData)
      .pipe(take(1));
  }




}
