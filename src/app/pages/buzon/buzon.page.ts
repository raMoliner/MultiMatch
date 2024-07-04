import { Component, OnInit } from '@angular/core';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { Invitacion } from 'src/app/models/models';

@Component({
  selector: 'app-buzon',
  templateUrl: './buzon.page.html',
  styleUrls: ['./buzon.page.scss'],
})
export class BuzonPage implements OnInit {
  invitaciones: Invitacion[] = [];
  isLoading = true;

  constructor(
    private almacenamientoService: AlmacenamientoService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private loadingController: LoadingController,
  ) {}

  ngOnInit() {
    this.loadInvitaciones();
  }

  async loadInvitaciones() {
    const loading = await this.loadingController.create({
      message: 'Cargando',
    });
    await loading.present();

    try {
      this.invitaciones = await this.almacenamientoService.get<Invitacion[]>('invitaciones') || [];
    } catch (error) {
      this.showErrorAlert('Error cargando invitaciones', (error as Error).message);
    } finally {
      this.isLoading = false;
      loading.dismiss();
    }
  }

  async aceptarInvitacion(invitacion: Invitacion) {
    invitacion.estado = 'aceptada';
    await this.almacenamientoService.updateInvitacion(invitacion);
    this.showAlert('Invitación Aceptada', 'Has aceptado la invitación.');
  }

  async rechazarInvitacion(invitacion: Invitacion) {
    invitacion.estado = 'rechazada';
    await this.almacenamientoService.updateInvitacion(invitacion);
    this.showAlert('Invitación Rechazada', 'Has rechazado la invitación.');
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  private async showErrorAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
