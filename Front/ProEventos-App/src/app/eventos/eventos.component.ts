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
  @Input() filtroLista : string = '';

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

      this.eventosFiltrados = this.eventos;
  }

  public onToggleImage(): any {

    if (this.mostrarImagem) {
      this.mostrarImagem = false;
    }else {
      this.mostrarImagem = true;
    }
  }

  setValue(para : string) {
    this.filtroLista = para;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  filtrarEventos(filtroLista: any): void {

    filtroLista = filtroLista.toLocaleLowerCase();

    return this.eventos.filter((evento: { tema: string; }) => evento.tema.toLocaleLowerCase().indexOf(filtroLista) !== -1
    )
  }

  getValue() {
    return this.filtroLista;
  }

}
