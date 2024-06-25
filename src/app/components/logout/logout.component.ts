import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlmacenamientoService } from '../../servicios/almacenamiento.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent {
  constructor(
    private almacenamientoService: AlmacenamientoService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.logout();
  }

  async logout() {
    try {
      await this.almacenamientoService.set('isLoggedIn', false);
      await this.almacenamientoService.set('currentUser', null);
      await this.showLogoutSuccessAlert();
      this.router.navigateByUrl('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      await this.showLogoutErrorAlert();
    }
  }

  private async showLogoutSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Logout Exitoso',
      message: 'Cerraste sesión sin problemas.',
      buttons: ['OK']
    });
    await alert.present();
  }

  private async showLogoutErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Logout Fallido',
      message: '¡Oops! Intentalo nuevamente.',
      buttons: ['OK']
    });
    await alert.present();
  }
}
