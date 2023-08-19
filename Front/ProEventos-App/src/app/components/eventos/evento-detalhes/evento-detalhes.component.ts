import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/Evento';

@Component({
  selector: 'app-evento-detalhes',
  templateUrl: './evento-detalhes.component.html',
  styleUrls: ['./evento-detalhes.component.css']
})
export class EventoDetalhesComponent implements OnInit {


  eventoId: number | undefined;
  evento = {} as Evento;
  form: any = FormGroup;
  estadoSalvar = 'post';
  file: File | undefined;

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.validation();
  }

  public validation() : void {

    this.form = this.fb.group(
      {
        local: ['', [Validators.required, Validators.minLength(5)]],
        dataEvento: ['', Validators.required], 
        tema: ['', Validators.required],
        qtdPessoas: ['', Validators.required],
        imagemURL: ['', Validators.required],
        telefone: ['', Validators.required],
        email: ['', Validators.required]
      }
    );
  }

  public resetForm() : void {

    this.form.reset();
  }


}
