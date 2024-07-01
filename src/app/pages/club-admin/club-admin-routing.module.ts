import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClubAdminPage } from './club-admin.page';

const routes: Routes = [
  {
    path: '',
    component: ClubAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubAdminPageRoutingModule {}
