import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Eventos } from '../_models/Eventos.ts';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [];
  public eventosFiltrados: any = [];
  larguraImagem: number = 50;
  margemImagem: number = 0.5;
  mostrarImagem: boolean = false;
  private _filtroLista : string = '';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getEventos();
  }

  public getEventos(): void {

    this.http.get('http://localhost:5000/api/Evento')
      .subscribe(
        response => {this.eventos = response, this.eventosFiltrados = response},
        error => console.log(error)
      );
  }

  public onToggleImage(): any {

    if (this.mostrarImagem) {
      this.mostrarImagem = false;
    }else {
      this.mostrarImagem = true;
    }
  }

  filtrarEventos(filtrarPor : string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; local: string; }) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(para : string) {
    this._filtroLista = para;
    this.eventosFiltrados = this._filtroLista ? this.filtrarEventos(this._filtroLista) : this.eventos;
  }

}
