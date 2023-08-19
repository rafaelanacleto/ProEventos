import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-evento-detalhes',
  templateUrl: './evento-detalhes.component.html',
  styleUrls: ['./evento-detalhes.component.css']
})
export class EventoDetalhesComponent implements OnInit {

  form = new FormGroup({ 
    local: new FormControl('', Validators.required),
        dataEvento: new FormControl('', Validators.required), 
        tema: new FormControl('', Validators.required),
        qtdPessoas: new FormControl('', Validators.required),
        imagemURL: new FormControl('', Validators.required),
        telefone: new FormControl('', Validators.max(11)),
        email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor() { }

  ngOnInit() {
  }

  public validation() : void {

    this.form = new FormGroup(
      {
        local: new FormControl('', Validators.required),
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
