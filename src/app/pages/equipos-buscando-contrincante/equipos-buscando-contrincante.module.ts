import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquiposBuscandoContrincantePageRoutingModule } from './equipos-buscando-contrincante-routing.module';

import { EquiposBuscandoContrincantePage } from './equipos-buscando-contrincante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquiposBuscandoContrincantePageRoutingModule
  ],
  declarations: [EquiposBuscandoContrincantePage]
})
export class EquiposBuscandoContrincantePageModule {}
