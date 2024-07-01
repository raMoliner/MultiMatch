import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JugadorAdminPage } from './jugador-admin.page';

const routes: Routes = [
  {
    path: '',
    component: JugadorAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JugadorAdminPageRoutingModule {}
