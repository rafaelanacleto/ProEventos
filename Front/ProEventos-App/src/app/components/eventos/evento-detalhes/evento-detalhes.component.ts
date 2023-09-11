import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/Evento';
import { DatePipe } from '@angular/common';
import { EventoService } from './../../../services/evento.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-evento-detalhes',
  templateUrl: './evento-detalhes.component.html',
  styleUrls: ['./evento-detalhes.component.css'],
  providers: [DatePipe]
})
export class EventoDetalhesComponent implements OnInit {

  eventoId: number = 0;
  evento = {} as Evento;
  form: any = FormGroup;
  estadoSalvar = 'post';
  loteAtual = { id: 0, nome: '', indice: 0 };
  imagemURL = 'assets/img/upload.png';
  file: File | undefined;
  locale = 'pt-br';

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private localeService: BsLocaleService,
    private activatedRouter: ActivatedRoute,
    private eventoService: EventoService,
    private router: Router
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

  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
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
        lotes: []
      }
    );
  }

  public resetForm() : void {

    this.form.reset();
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
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
