import { Component, OnInit } from '@angular/core';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { Usuario, Equipo } from 'src/app/models/models';

@Component({
  selector: 'app-jugador-admin',
  templateUrl: './jugador-admin.page.html',
  styleUrls: ['./jugador-admin.page.scss'],
})
export class JugadorAdminPage implements OnInit {
  equipo: Equipo | null = null;
  miembros: Usuario[] = [];
  emailMiembro: string = '';

  constructor(private almacenamientoService: AlmacenamientoService) {}

  ngOnInit() {
    this.loadEquipo();
  }

  async loadEquipo() {
    const equipos = await this.almacenamientoService.getEquipos().toPromise();
    // Supongamos que el equipo actual está guardado en algún lugar, como en el almacenamiento local
    this.equipo = equipos ? equipos.find(e => e.id === 'id-del-equipo-actual') || null : null;
    if (this.equipo) {
      this.miembros = [];
      for (const miembroId of this.equipo.miembros) {
        const miembro = await this.almacenamientoService.getUsuarioById(miembroId);
        if (miembro) {
          this.miembros.push(miembro);
        }
      }
    }
  }

  async agregarMiembro() {
    const usuarios = await this.almacenamientoService.getUsuarios().toPromise();
    const nuevoMiembro = usuarios ? usuarios.find(u => u.email === this.emailMiembro) : null;
    if (nuevoMiembro && this.equipo) {
      this.equipo.miembros.push(nuevoMiembro.id);
      await this.almacenamientoService.updateEquipo(this.equipo);
      this.loadEquipo();
    }
  }

  async eliminarMiembro(miembroId: string) {
    if (this.equipo) {
      this.equipo.miembros = this.equipo.miembros.filter(m => m !== miembroId);
      await this.almacenamientoService.updateEquipo(this.equipo);
      this.loadEquipo();
    }
  }
}

