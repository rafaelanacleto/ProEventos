import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { take, map } from 'rxjs/operators';

import { Lote } from '../models/Lote';


@Injectable({
  providedIn: 'root'
})
export class LoteService {

  lotes: Object = new Object();
  baseURL = 'https://localhost:5001/api/Lotes';
  tokenHeader: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {}


  getAllLote(): Observable<Lote[]> {
    return this.http.get<Lote[]>(this.baseURL, { headers: this.tokenHeader });
  }

  getAllLoteById(id: number): Observable<Lote> {
    return this.http.get<Lote>(`${this.baseURL}/${id}`);
  }

  public getLotesByEventoId(eventoId: number): Observable<Lote[]> {
    return this.http.get<Lote[]>(`${this.baseURL}/${eventoId}`).pipe(take(1));
  }

  public put(eventoId: number  ,lote: Lote[]): Observable<Lote[]> {
    return this.http
      .put<Lote[]>(`${this.baseURL}/${eventoId}`, lote)
      .pipe(take(1));
  }

  public deleteLote(eventoId: number, loteId: number): Observable<any> {
    return this.http
      .delete(`${this.baseURL}/${eventoId}/${loteId}`)
      .pipe(take(1));
  }

}
