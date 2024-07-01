import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitarPartidoPage } from './solicitar-partido.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitarPartidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitarPartidoPageRoutingModule {}
