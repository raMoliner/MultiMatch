import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuzonPage } from './buzon.page';

const routes: Routes = [
  {
    path: '',
    component: BuzonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuzonPageRoutingModule {}
