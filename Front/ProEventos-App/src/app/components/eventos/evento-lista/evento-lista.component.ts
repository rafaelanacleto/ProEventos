import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Evento } from '../../../models/Evento';
import { EventoService } from '../../../services/evento.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent {

  nome:string = 'Eventos';
  public eventos: Evento[] = [];
  public eventoId = 0;
  public eventosFiltrados: Evento[] = [];
  larguraImagem: number = 50;
  margemImagem: number = 0.5;
  mostrarImagem: boolean = false;
  public exibirImagem = true;
  private _filtroLista : string = '';
  modalRef?: BsModalRef;
  message?: string;

  constructor(private eventoService: EventoService,
              private modalService: BsModalService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private router : Router) {
  }

  public alterarImagem(): void {
    this.exibirImagem = !this.exibirImagem;
  }

  public mostraImagem(imagemURL: string): string {
    return imagemURL !== ''
      ? `${environment.apiURL}Resources/Images/${imagemURL}`
      : 'assets/img/semImagem.jpeg';
  }

  ngOnInit() {

    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1200);

    this.getEventos();
  }

  openModal(e: any, template: TemplateRef<any>, eventoId: number) {

    e.stopPropagation();
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef?.hide();

    this.eventoService.deleteEvento(this.eventoId).subscribe({
      next: (result) => {
        if(result === true)
        {
          this.toastr.success('O evento foi deletado com sucesso!', 'Deletado!');
          this.spinner.hide();
          this.getEventos();
        }
      },
      error: (v) => {
        console.error(v);
        this.toastr.error("Erro ao deletar ao ventro", "Erro Delete*");
      },
      complete: () => {}
    })



  }

  decline(): void {
    this.message = 'Deletado!';
    this.modalRef?.hide();
    this.toastr.error('Exclusão Cancelada!', 'Informação');
  }

  detalheEvento(id : number) : void {
    this.router.navigate([`eventos/detalhe/${id}`]);
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
