import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Evento } from '../models/Evento';
import { EventoService } from '../services/evento.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  larguraImagem: number = 50;
  margemImagem: number = 0.5;
  mostrarImagem: boolean = false;
  private _filtroLista : string = '';
  modalRef?: BsModalRef;
  message?: string;

  constructor(private eventoService: EventoService, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.getEventos();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef?.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }

  public getEventos(): void {

    this.eventoService.getAllEvento()
      .subscribe(
        {
          next: (v) => this.eventos = v,
          error: (e) => console.log(this.eventos),
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

  public cleanFiltroLista() : any {
    this._filtroLista = '';
    this.getEventos();
  }

  public set filtroLista(para : string) {
    this._filtroLista = para;
    this.eventosFiltrados = this._filtroLista ? this.filtrarEventos(this._filtroLista) : this.eventos;
  }

}
