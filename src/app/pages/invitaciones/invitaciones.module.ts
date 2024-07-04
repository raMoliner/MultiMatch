import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvitacionesPageRoutingModule } from './invitaciones-routing.module';

import { InvitacionesPage } from './invitaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvitacionesPageRoutingModule
  ],
  declarations: [InvitacionesPage]
})
export class InvitacionesPageModule {}
