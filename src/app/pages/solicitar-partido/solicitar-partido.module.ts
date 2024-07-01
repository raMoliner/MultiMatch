import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitarPartidoPageRoutingModule } from './solicitar-partido-routing.module';

import { SolicitarPartidoPage } from './solicitar-partido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitarPartidoPageRoutingModule
  ],
  declarations: [SolicitarPartidoPage]
})
export class SolicitarPartidoPageModule {}
