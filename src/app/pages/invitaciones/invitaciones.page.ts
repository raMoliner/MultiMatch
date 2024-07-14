import { Component, OnInit } from '@angular/core';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { Usuario, Invitacion, Equipo } from 'src/app/models/models';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-invitaciones',
  templateUrl: './invitaciones.page.html',
  styleUrls: ['./invitaciones.page.scss'],
})
export class InvitacionesPage implements OnInit {
  currentUser: Usuario | null = null;
  invitaciones: Invitacion[] = [];
  jugadores: Usuario[] = [];
  mensaje: string = '';
  isLoading = true;

  constructor(
    private almacenamientoService: AlmacenamientoService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Cargando',
    });
    await loading.present();

    try {
      this.currentUser = await this.almacenamientoService.getCurrentUser();
      if (this.currentUser) {
        this.loadInvitaciones();
        if (this.currentUser.tipoUsuario === 'club') {
          this.loadJugadores();
        }
      } else {
        console.error('No se encontro al usuario.');
      }
    } catch (error) {
      this.showErrorAlert('Error cargando invitaciones', (error as Error).message);
    } finally {
      this.isLoading = false;
      loading.dismiss();
    }
  }

  async loadInvitaciones() {
    this.almacenamientoService
      .getInvitaciones()
      .subscribe((todasInvitaciones: Invitacion[]) => {
        this.invitaciones = todasInvitaciones.filter(
          (i: Invitacion) => i.jugadorId === this.currentUser?.id
        );
      });
  }

  async loadJugadores() {
    const jugadores = await this.almacenamientoService.getUsuarios().toPromise();
    this.jugadores = jugadores ? jugadores.filter(j => j.tipoUsuario === 'jugador') : [];
  }

  async mostrarAlert(header: string, mensaje: string) {
    const alert = await this.alertController.create({
      header,
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
        this.mostrarAlert('Invitación Aceptada', 'Has sido añadido al equipo');
      }
    } else {
      this.mostrarAlert('Invitación Rechazada', 'Has rechazado la invitación');
    }

    this.loadInvitaciones();
  }

  private async showErrorAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async enviarInvitacion(jugador: Usuario) {
    const alert = await this.alertController.create({
      header: 'Invitar Jugador',
      inputs: [
        {
          name: 'mensaje',
          type: 'text',
          placeholder: 'Escribe un mensaje'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Enviar',
          handler: async (data) => {
            const currentUser = await this.almacenamientoService.getCurrentUser();
            if (currentUser) {
              const equipo = await this.almacenamientoService.getEquipoById(currentUser.equipo || '');
              if (equipo) {
                await this.almacenamientoService.enviarInvitacion(jugador, equipo, data.mensaje);
                this.mostrarAlert('Invitación Enviada', 'La invitación ha sido enviada al jugador.');
              }
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
