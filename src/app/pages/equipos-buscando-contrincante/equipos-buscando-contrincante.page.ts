import { Component, OnInit } from '@angular/core';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { Equipo, Usuario } from 'src/app/models/models';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-equipos-buscando-contrincante',
  templateUrl: './equipos-buscando-contrincante.page.html',
  styleUrls: ['./equipos-buscando-contrincante.page.scss'],
})
export class EquiposBuscandoContrincantePage implements OnInit {
  equiposBuscandoContrincante: Equipo[] = [];
  currentUser: Usuario | null = null;

  constructor(
    private almacenamientoService: AlmacenamientoService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.equiposBuscandoContrincante = await this.almacenamientoService.get<Equipo[]>('equipos') || [];
    this.currentUser = await this.almacenamientoService.getCurrentUser();
  }

  async retarEquipo(equipo: Equipo) {
    if (this.currentUser && this.currentUser.equipo) {
      const equipoActual = await this.almacenamientoService.getEquipoById(this.currentUser.equipo);
      if (equipoActual) {
        await this.almacenamientoService.enviarReto(equipoActual, equipo);
        this.showSuccessAlert('Reto Enviado', 'El reto ha sido enviado al equipo.');
      }
    }
  }

  private async showSuccessAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
