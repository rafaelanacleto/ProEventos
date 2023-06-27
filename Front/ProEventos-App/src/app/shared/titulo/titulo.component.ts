import { Component, Input, OnInit } from '@angular/core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent implements OnInit {

  @Input() filtro : string = "title";
  filmIcon = faFilm;
  constructor() { }

  ngOnInit() {
  }

}
