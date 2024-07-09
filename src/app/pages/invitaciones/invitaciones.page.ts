import { Component, OnInit } from '@angular/core';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { Usuario, Invitacion } from 'src/app/models/models';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-invitaciones',
  templateUrl: './invitaciones.page.html',
  styleUrls: ['./invitaciones.page.scss'],
})
export class InvitacionesPage implements OnInit {
  currentUser: Usuario | null = null;
  invitaciones: Invitacion[] = [];

  constructor(
    private almacenamientoService: AlmacenamientoService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.currentUser = await this.almacenamientoService.getCurrentUser();
    if (this.currentUser) {
      this.almacenamientoService
        .getInvitaciones()
        .subscribe((todasInvitaciones: Invitacion[]) => {
          this.invitaciones = todasInvitaciones.filter(
            (i: Invitacion) => i.jugadorId === this.currentUser?.id
          );
        });
    } else {
     
      console.error('No se encontro al usuario.');
      
    }
  }

  async mostrarAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Invitación',
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async responderInvitacion(
    invitacion: Invitacion,
    estado: 'pendiente' | 'aceptada' | 'rechazada'
  ) {
    if (!this.currentUser) {
      console.error('No current user to respond to invitation.');
      return;
    }

    invitacion.estado = estado;
    await this.almacenamientoService.updateInvitacion(invitacion);

    if (estado === 'aceptada') {
      const equipo = await this.almacenamientoService.getEquipoById(
        invitacion.equipoId
      );
      if (equipo) {
        equipo.miembros.push(this.currentUser.id.toString()); 
        await this.almacenamientoService.updateEquipo(equipo);
        this.mostrarAlert('Has sido añadido al equipo');
      }
    } else {
      this.mostrarAlert('Has rechazado la invitación');
    }

    this.ngOnInit(); 
  }
}
