import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Evento } from '../models/Evento';
import { EventoService } from '../services/evento.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

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

  constructor(private eventoService: EventoService,
              private modalService: BsModalService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit() {

    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);

    this.getEventos();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef?.hide();
    this.toastr.success('O evento foi deletado com sucesso!', 'Deletado!');
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
    this.toastr.error('Exclusão Cancelada!', 'Informação');
  }

  public getEventos(): void {

    this.eventoService.getAllEvento()
      .subscribe(
        {
          next: (v) => this.eventos = v,
          error: (e) => this.toastr.error('Erro ao buscar os Eventos!', 'Erro 500'),
          complete: () => this.eventosFiltrados = this.eventos
        }
      );
  }

  public onToggleImage(): void {
    this.mostrarImagem = !this.mostrarImagem;
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
