import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquiposBuscandoContrincantePage } from './equipos-buscando-contrincante.page';

const routes: Routes = [
  {
    path: '',
    component: EquiposBuscandoContrincantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquiposBuscandoContrincantePageRoutingModule {}
