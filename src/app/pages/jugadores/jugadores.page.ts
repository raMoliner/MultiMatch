import { Component, OnInit } from '@angular/core';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { Usuario, Equipo } from 'src/app/models/models';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.page.html',
  styleUrls: ['./jugadores.page.scss'],
})
export class JugadoresPage implements OnInit {
  jugadores: Usuario[] = [];
  jugadoresFiltrados: Usuario[] = [];
  equipoId: string = '';
  searchTerm: string = '';

  constructor(private almacenamientoService: AlmacenamientoService, private alertController: AlertController) {}

  async ngOnInit() {
    this.almacenamientoService.getUsuarios().subscribe(usuarios => {
      this.jugadores = usuarios.filter(usuario => usuario.tipoUsuario === 'jugador');
      this.filtrarJugadores();
    });
  }

  filtrarJugadores() {
    this.jugadoresFiltrados = this.jugadores.filter(jugador =>
      jugador.nombre?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      jugador.apellidoPaterno?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  async invitarJugador(jugador: Usuario) {
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
              }
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
