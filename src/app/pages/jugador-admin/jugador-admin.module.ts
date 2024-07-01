import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JugadorAdminPageRoutingModule } from './jugador-admin-routing.module';

import { JugadorAdminPage } from './jugador-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JugadorAdminPageRoutingModule
  ],
  declarations: [JugadorAdminPage]
})
export class JugadorAdminPageModule {}
