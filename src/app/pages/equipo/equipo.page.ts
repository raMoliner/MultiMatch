import { Component, OnInit } from '@angular/core';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { Equipo, Usuario } from 'src/app/models/models';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.page.html',
  styleUrls: ['./equipo.page.scss'],
})
export class EquipoPage implements OnInit {
  equipoId: string = '';
  equipo: Equipo | null = null;
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
  }

  async agregarMiembro() {
    const usuarios = await this.almacenamientoService.getUsuarios().toPromise();
    const nuevoMiembro = usuarios ? usuarios.find((u: Usuario) => u.email === this.emailMiembro) : null;
    if (nuevoMiembro && this.equipo) {
      this.equipo.miembros.push(nuevoMiembro);
      await this.almacenamientoService.updateEquipo(this.equipo);
      this.loadEquipo();
    }
  }
}
