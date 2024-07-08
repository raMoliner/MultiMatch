import { Component, OnInit } from '@angular/core';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { Equipo, Usuario } from 'src/app/models/models';

@Component({
  selector: 'app-jugador-admin',
  templateUrl: './jugador-admin.page.html',
  styleUrls: ['./jugador-admin.page.scss'],
})
export class JugadorAdminPage implements OnInit {
  equipoId: string;
  equipo: Equipo | null = null;
  miembroId: string = '';
  miembros: Usuario[] = [];

  constructor(private almacenamientoService: AlmacenamientoService) {
    this.equipoId = '1'; // Define un valor predeterminado o obténlo de la ruta
  }

  ngOnInit() {
    this.loadEquipo();
  }

  async loadEquipo() {
    const equipos = await this.almacenamientoService.getEquipos().toPromise();
    this.equipo = equipos ? equipos.find(e => e.id === this.equipoId) || null : null;
    if (this.equipo) {
      this.miembros = await this.almacenamientoService.getUsuariosByIds(this.equipo.miembros);
    }
  }

  async agregarMiembro(miembroId: string) {
    if (this.equipo) {
      const miembro = await this.almacenamientoService.getUsuarioById(miembroId);
      if (miembro) {
        this.equipo.miembros.push(miembro.id);
        await this.almacenamientoService.updateEquipo(this.equipo);
        this.loadEquipo();
      }
    }
  }
}
