import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventosComponent } from './components/eventos/eventos.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';
import { ContatosComponent } from './components/contatos/contatos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventoDetalhesComponent } from './components/eventos/evento-detalhes/evento-detalhes.component';
import { EventoListaComponent } from './components/eventos/evento-lista/evento-lista.component';
import { LoginComponent } from './components/user/login/login.component';

const routes: Routes = [
  
  {path: 'eventos', redirectTo: 'eventos/lista'},
  {    
    path: 'eventos', component: EventosComponent,
    children: [
      { path: 'detalhe/:id' , component: EventoDetalhesComponent },
      { path: 'detalhe' , component: EventoDetalhesComponent },
      { path: 'lista' , component: EventoListaComponent }
    ]
  },

  { path: 'login', component: LoginComponent },
  { path: '', component: EventosComponent },
  { path: 'palestrantes', component: PalestrantesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'contatos', component: ContatosComponent },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
