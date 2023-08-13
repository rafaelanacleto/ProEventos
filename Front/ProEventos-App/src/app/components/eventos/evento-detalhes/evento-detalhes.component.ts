import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-evento-detalhes',
  templateUrl: './evento-detalhes.component.html',
  styleUrls: ['./evento-detalhes.component.css']
})
export class EventoDetalhesComponent implements OnInit {


  form!: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  public validation() : void {
    this.form = new FormGroup(
      {
        local: new FormControl(),
        dataEvento: new FormControl(), 
        tema: new FormControl(),
        qtdPessoas: new FormControl(),
        imagemURL: new FormControl(),
        telefone: new FormControl(),
        email: new FormControl()
      }
    );
  }

}
