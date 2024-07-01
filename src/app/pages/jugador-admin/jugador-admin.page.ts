import { Component, OnInit } from '@angular/core';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { Equipo, Usuario } from 'src/app/models/models';

@Component({
  selector: 'app-jugador-admin',
  templateUrl: './jugador-admin.page.html',
  styleUrls: ['./jugador-admin.page.scss'],
})
export class JugadorAdminPage implements OnInit {
  equipoId: string = '';
  equipo: Equipo | null = null;
  miembros: Usuario[] = [];
  emailMiembro: string = '';

  constructor(
    private almacenamientoService: AlmacenamientoService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private loadingController: LoadingController,
  ) {}

  ngOnInit() {
    this.loadEquipo();
  }

  async loadEquipo() {
    const equipos = await this.almacenamientoService.getEquipos().toPromise();
    this.equipo = equipos ? equipos.find((e: Equipo) => e.id === this.equipoId) || null : null;
    this.miembros = this.equipo ? this.equipo.miembros : [];
  }

  async addMiembro() {
    const usuarios = await this.almacenamientoService.getUsuarios().toPromise();
    const nuevoMiembro = usuarios ? usuarios.find((u: Usuario) => u.email === this.emailMiembro) : null;
    if (nuevoMiembro && this.equipo) {
      this.equipo.miembros.push(nuevoMiembro);
      await this.almacenamientoService.updateEquipo(this.equipo);
      this.loadEquipo();
    }
  }

  async deleteMiembro(miembroId: string) {
    if (this.equipo) {
      this.equipo.miembros = this.equipo.miembros.filter(m => m.id !== miembroId);
      await this.almacenamientoService.updateEquipo(this.equipo);
      this.loadEquipo();
    }
  }
}
