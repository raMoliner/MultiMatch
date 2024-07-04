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
  currentUser: Usuario = {} as Usuario;
  invitaciones: Invitacion[] = [];

  constructor(private almacenamientoService: AlmacenamientoService, private alertController: AlertController) {}

  async ngOnInit() {
    this.currentUser = await this.almacenamientoService.getCurrentUser();
    this.almacenamientoService.getInvitaciones().subscribe((todasInvitaciones: Invitacion[]) => {
      this.invitaciones = todasInvitaciones.filter((i: Invitacion) => i.jugadorId === this.currentUser?.id);
    });
  }

  async mostrarAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Invitación',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async responderInvitacion(invitacion: Invitacion, estado: 'pendiente' | 'aceptada' | 'rechazada') {
    invitacion.estado = estado;
    await this.almacenamientoService.updateInvitacion(invitacion);
  
    if (estado === 'aceptada') {
      const equipo = await this.almacenamientoService.getEquipoById(invitacion.equipoId);
      if (equipo) {
        equipo.miembros.push(this.currentUser.id.toString()); // Asegurándonos de que la ID del usuario es un string
        await this.almacenamientoService.updateEquipo(equipo);
        this.mostrarAlert('Has sido añadido al equipo');
      }
    } else {
      this.mostrarAlert('Has rechazado la invitación');
    }
  
    this.ngOnInit(); // Refresh the list of invitations
  }
}
