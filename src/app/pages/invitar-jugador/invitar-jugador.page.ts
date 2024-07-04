import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { Usuario, Equipo } from 'src/app/models/models';

@Component({
  selector: 'app-invitar-jugador',
  templateUrl: './invitar-jugador.page.html',
  styleUrls: ['./invitar-jugador.page.scss'],
})
export class InvitarJugadorPage implements OnInit {
  jugador: Usuario = {} as Usuario;
  mensaje: string = '';

  constructor(private almacenamientoService: AlmacenamientoService, private route: ActivatedRoute) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.jugador = await this.almacenamientoService.getUsuarioById(id) || {} as Usuario;
    }
  }

  async enviarInvitacion() {
    const currentUser = await this.almacenamientoService.getCurrentUser();
    if (currentUser && this.jugador) {
      const equipo = await this.almacenamientoService.getEquipoById(currentUser.equipo || '');
      if (equipo) {
        await this.almacenamientoService.enviarInvitacion(this.jugador, equipo, this.mensaje);
      }
    }
  }
}
