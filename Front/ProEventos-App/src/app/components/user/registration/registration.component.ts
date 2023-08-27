import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ValidatorField } from 'src/app/helpers/ValidatorField';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{

  form: any = FormGroup;

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.validation();
  }

  public validation() : void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch("senha", "confirmeSenha")
    };


    this.form = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(5)]],
        lastName: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.email]],
        userName: ['', [Validators.required]],
        senha: ['', [Validators.required, Validators.minLength(5)]],
        confirmeSenha: ['', [Validators.required, Validators.minLength(5)]]

      }, formOptions
    );
  }

}
