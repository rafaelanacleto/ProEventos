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
import { Constants } from '../../../util/constants';

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
    this.localeService.use('pt-br');
    this.validation();
  }

  get modoEditar(): boolean {
    return this.estadoSalvar === 'put';
  }

  public carregarLotes(): void {
    this.loteService
      .getLotesByEventoId(this.eventoId)
      .subscribe(
        (lotesRetorno: Lote[]) => {
          lotesRetorno.forEach((lote) => {
            this.lotes.push(this.criarLote(lote));
          });
        },
        (error: any) => {
          this.toastr.error('Erro ao tentar carregar lotes', 'Erro');
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
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
            this.carregarLotes();
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
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false,
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

  public mudarValorData(value: Date, indice: number, campo: string): void {
    this.lotes.value[indice][campo] = value;
  }

  public retornaTituloLote(nome: string): string {
    return nome === null || nome === '' ? 'Nome do lote' : nome;
  }

  public removerLote(template: TemplateRef<any>, indice: number): void {
    this.loteAtual.id = this.lotes.get(indice + '.id').value;
    this.loteAtual.nome = this.lotes.get(indice + '.nome').value;
    this.loteAtual.indice = indice;

    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  public resetForm() : void {

    this.form.reset();
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  adicionarLote(): void {
    this.lotes.push(this.criarLote({ id: 0 } as Lote));
  }

   public salvarLotes(): void {
    if (this.form.controls.lotes.valid) {
      this.spinner.show();
      this.loteService
        .saveLote(this.eventoId, this.form.value.lotes)
        .subscribe(
          () => {
            this.toastr.success('Lotes salvos com Sucesso!', 'Sucesso!');
          },
          (error: any) => {
            this.toastr.error('Erro ao tentar salvar lotes.', 'Erro');
            console.error(error);
          }
        )
        .add(() => this.spinner.hide());
    }
  }


  criarLote(lote: Lote): FormGroup {
    return this.fb.group({
      id: [lote.id],
      nome: [lote.nome, Validators.required],
      quantidade: [lote.quantidade, Validators.required],
      preco: [lote.preco, Validators.required],
      dataIncio: [lote.dataIncio],
      dataFim: [lote.dataFim],
    });
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


  onFileChange(ev: any): void {
    const reader = new FileReader();

    reader.onload = (event: any) => this.imagemURL = event.target.result;

    this.file = ev.target.files;
    reader.readAsDataURL(this.file[0]);

    this.uploadImagem();
  }

  uploadImagem(): void {
    this.spinner.show();  
    this.eventoService.postUpload(this.eventoId, this.file).subscribe(
      () => {
        this.carregarEvento();
        this.toastr.success('Imagem atualizada com Sucesso', 'Sucesso!');
      },
      (error: any) => {
        this.toastr.error('Erro ao fazer upload de imagem', 'Erro!');
        console.log(error);
      }
    ).add(() => this.spinner.hide());
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
