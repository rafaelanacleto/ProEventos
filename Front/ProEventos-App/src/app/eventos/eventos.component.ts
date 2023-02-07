import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos : any = [
    {
      Tema: 'angular',
      Local: 'Esteio-RS',
      Quantidade : 1
    },
    {
      Tema: 'C#',
      Local: 'Gravataí-RS',
      Quantidade : 2
    },
    {
      Tema: 'Javascript',
      Local: 'Porto Alegre-RS',
      Quantidade : 3
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
