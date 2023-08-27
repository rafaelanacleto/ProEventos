import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ValidatorField } from 'src/app/helpers/ValidatorField';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  form: any = FormGroup;

  nome:string = 'Perfil';
  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
  }


  public validation() : void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch("senha", "confirmeSenha")
    };


    this.form = this.fb.group(
      {
        titulo: ['', [Validators.required, Validators.minLength(5)]],

      }, formOptions
    );
  }




}
