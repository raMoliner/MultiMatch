import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClubAdminPageRoutingModule } from './club-admin-routing.module';

import { ClubAdminPage } from './club-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClubAdminPageRoutingModule
  ],
  declarations: [ClubAdminPage]
})
export class ClubAdminPageModule {}
