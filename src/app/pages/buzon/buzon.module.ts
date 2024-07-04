import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuzonPageRoutingModule } from './buzon-routing.module';

import { BuzonPage } from './buzon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuzonPageRoutingModule
  ],
  declarations: [BuzonPage]
})
export class BuzonPageModule {}
