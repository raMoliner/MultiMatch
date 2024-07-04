import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvitacionesPage } from './invitaciones.page';

const routes: Routes = [
  {
    path: '',
    component: InvitacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitacionesPageRoutingModule {}
