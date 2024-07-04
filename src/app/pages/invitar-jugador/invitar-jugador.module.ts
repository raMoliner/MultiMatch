import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { InvitarJugadorPage } from './invitar-jugador.page';

const routes: Routes = [
  {
    path: '',
    component: InvitarJugadorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InvitarJugadorPage]
})
export class InvitarJugadorPageModule {}
