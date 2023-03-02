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
  eventosFiltrados: Eventos[] = [];
  larguraImagem: number = 50;
  margemImagem: number = 0.5;
  mostrarImagem: boolean = false;
  private _filtroLista : string = '';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getEventos();
  }

  public getEventos(): any {

    this.http.get('http://localhost:5000/api/Evento')
      .subscribe(
        {
          next: (v) => this.eventos = v,
          error: (e) => console.log(e),
          complete: () => this.eventosFiltrados = this.eventos
        }
      );
  }

  public onToggleImage(): any {

    if (this.mostrarImagem) {
      this.mostrarImagem = false;
    }else {
      this.mostrarImagem = true;
    }
  }

  filtrarEventos(filtroLista: string): void {

    filtroLista = filtroLista.toLocaleLowerCase();

    if(!filtroLista)
    {
      return this.eventos;
    }
    else{
      return this.eventos.filter(
        (evento: { tema: string; }) => evento.tema.toLocaleLowerCase().indexOf(filtroLista) !== -1
      )
    }
  }

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(para : string) {
    this._filtroLista = para;
    this.eventos = this._filtroLista ? this.filtrarEventos(this._filtroLista) : this.eventos;
  }

}
