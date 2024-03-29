import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent implements OnInit {

  @Input() filtro : string = "title";
  @Input() botaoListar : boolean = false;
  filmIcon = faFilm;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  listar() : void {
     this.router.navigate([`/${this.filtro.toLocaleLowerCase()}/lista`]);
  }

}
