import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [];

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.getEventos();
  }

  public getEventos(): any {

    this.http.get('http://localhost:5000/api/Evento')
      .subscribe(
        {
          next: (v) => this.eventos = v,
          error: (e) => console.log(e),
          complete: () => console.info('complete')
        }
      );
  }

}
