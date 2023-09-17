import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/Evento';
import { DatePipe } from '@angular/common';
import { EventoService } from './../../../services/evento.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Lote } from 'src/app/models/Lote';
import { LoteService } from 'src/app/services/lote.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-evento-detalhes',
  templateUrl: './evento-detalhes.component.html',
  styleUrls: ['./evento-detalhes.component.css'],
  providers: [DatePipe]
})
export class EventoDetalhesComponent implements OnInit {

  eventoId: number = 0;
  modalRef: BsModalRef;
  evento = {} as Evento;
  form: any = FormGroup;
  estadoSalvar = 'post';
  loteAtual = { id: 0, nome: '', indice: 0 };
  imagemURL = 'assets/img/upload.png';
  file: File | undefined;
  locale = 'en';

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private localeService: BsLocaleService,
    private activatedRouter: ActivatedRoute,
    private eventoService: EventoService,
    private router: Router,
    private modalService: BsModalService,
    private loteService: LoteService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {

    this.spinner.show();
    this.spinner.hide();
    this.carregarEvento();
    this.localeService.use(this.locale);
    this.validation();
  }

  public carregarEvento(): void {

    this.eventoId = +this.activatedRouter.snapshot.paramMap.get('id')!;

    if (this.eventoId !== null && this.eventoId !== 0) {

      this.estadoSalvar = 'put';

      this.eventoService
        .getEventoById(this.eventoId)
        .subscribe(
          (evento: Evento) => {
            this.evento = { ...evento };
            this.form.patchValue(this.evento);
          },
          (error: any) => {
            this.toastr.error('Erro ao tentar carregar Evento.', 'Erro!');
            console.error(error);
          },
          (complete?: any) => {
          }
        )
    }
  }

  get lotes(): FormArray {
    return this.form.get('lotes') as FormArray;
  }

  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'YYYY-MM-DD',
      containerClass: 'theme-default',
      showWeekNumbers: false
    };
  }

  public validation() : void {

    this.form = this.fb.group(
      {
        local: ['', [Validators.required, Validators.minLength(5)]],
        dataEvento: ['', Validators.required],
        tema: ['', Validators.required],
        qtdPessoas: ['', Validators.required],
        imagemURL: [''],
        telefone: ['', Validators.required],
        email: ['', Validators.required],
        lotes: this.fb.array([]),
      }
    );
  }

  public resetForm() : void {

    this.form.reset();
  }

  public retornaTituloLote(nome: string): string {
    return nome === null || nome === '' ? 'Nome do lote' : nome;
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  adicionarLote(): void {
    this.lotes.push(this.criarLote({ id: 0 } as Lote));
  }


  criarLote(lote: Lote): FormGroup {
    return this.fb.group({
      id: [lote.id],
      nome: [lote.nome, Validators.required],
      quantidade: [lote.quantidade, Validators.required],
      preco: [lote.preco, Validators.required],
      dataInicio: [lote.dataInicio],
      dataFim: [lote.dataFim],
    });
  }

  public removerLote(template: TemplateRef<any>, indice: number): void {
    this.loteAtual.id = this.lotes.get(indice + '.id').value;
    this.loteAtual.nome = this.lotes.get(indice + '.nome').value;
    this.loteAtual.indice = indice;

    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirmDeleteLote(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.loteService
      .deleteLote(this.eventoId, this.loteAtual.id)
      .subscribe(
        () => {
          this.toastr.success('Lote deletado com sucesso', 'Sucesso');
          this.lotes.removeAt(this.loteAtual.indice);
        },
        (error: any) => {
          this.toastr.error(
            `Erro ao tentar deletar o Lote ${this.loteAtual.id}`,
            'Erro'
          );
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }

  declineDeleteLote(): void {
    this.modalRef.hide();
  }

  public salvarAlteracao(): void {

    if (this.form.valid) {

        this.evento =
        this.estadoSalvar === 'post'
          ? { ...this.form.value }
          : { id: this.evento.id, ...this.form.value };

        console.log(this.estadoSalvar);

        this.eventoService[this.estadoSalvar](this.evento).subscribe(
          (eventoRetorno: Evento) => {
            this.toastr.success('Evento salvo com Sucesso!', 'Sucesso');
            this.router.navigate([`eventos/detalhe/${eventoRetorno.id}`]);
          },
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Error ao salvar evento', 'Erro');
          },
          () => this.spinner.hide()
        );

    }

  }

}
