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
  ) { }

  ngOnInit() {

    this.spinner.show();

    this.carregarEvento();
    this.localeService.use(this.locale);
    this.validation();
  }

  public carregarEvento(): void {

    this.activatedRouter.params
    .subscribe(
      (params: Params) => {
        this.eventoId = +params['id'];
      }
    );

    // this.eventoId = 1; // +this.activatedRouter.snapshot.paramMap.get('id');

    if (this.eventoId !== null && this.eventoId !== 0) {

      this.estadoSalvar = 'put';

      this.eventoService
        .getEventoById(this.eventoId)
        .subscribe(
          (evento: Evento) => {
            this.evento = { ...evento };
            this.form.patchValue(this.evento);
            console.log(this.evento.telefone);
            this.spinner.show();
            // if (this.evento.imagemURL !== '') {
            //   this.imagemURL = environment.apiURL + 'resources/images/' + this.evento.imagemURL;
            // }
           // this.carregarLotes();
          },
          (error: any) => {
            this.toastr.error('Erro ao tentar carregar Evento.', 'Erro!');
            console.error(error);
          },
          (complete?: any) => {
            this.spinner.hide();
          }
        )
        .add(() => this.spinner.hide());
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
        email: ['', Validators.required]
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

    console.log("form: " + this.form.valid);

    if (this.form.valid) {

      this.evento = {... this.form.value};

      this.eventoService.post(this.evento).subscribe(
        (evento: Evento) => {

          this.toastr.success("Evento salvo com sucesso", "Sucesso")

        },
        (error: any) => {
          this.toastr.error('Erro ao tentar salvar Evento.', 'Erro!');
          console.error(error);
        },
        (complete?: any) => {
          this.spinner.hide();
        }
      );


      this.eventoService.put(this.evento).subscribe(
        (evento: Evento) => {

          this.toastr.success("Evento salvo com sucesso", "Sucesso")

        },
        (error: any) => {
          this.toastr.error('Erro ao tentar salvar Evento.', 'Erro!');
          console.error(error);
        },
        (complete?: any) => {
          this.spinner.hide();
        }
      );


    }


  }


}
