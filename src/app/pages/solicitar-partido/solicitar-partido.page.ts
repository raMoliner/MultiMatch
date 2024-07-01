import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { Equipo, Partido, Cancha, Club } from 'src/app/models/models';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-solicitar-partido',
  templateUrl: './solicitar-partido.page.html',
  styleUrls: ['./solicitar-partido.page.scss'],
})
export class SolicitarPartidoPage implements OnInit {
  equipoId: string;
  fecha: string = '';
  hora: string = '';
  canchaSeleccionada: string = '';
  equipo: Equipo = { id: '', nombre: '', miembros: [] };
  canchasSugeridas: Cancha[] = [];

  constructor(
    private route: ActivatedRoute,
    private almacenamientoService: AlmacenamientoService,
    private navCtrl: NavController
  ) {
    this.equipoId = this.route.snapshot.paramMap.get('equipoId') || '';
  }

  ngOnInit() {
    this.loadEquipo();
    this.loadCanchasSugeridas();
  }

  async loadEquipo() {
    const equipos = await this.almacenamientoService.get<Equipo[]>('equipos');
    this.equipo = (equipos || []).find(e => e.id === this.equipoId) || { id: '', nombre: '', miembros: [] };
  }

  async loadCanchasSugeridas() {
    const clubes = await this.almacenamientoService.get<Club[]>('clubs');
    this.canchasSugeridas = (clubes || []).reduce((acc: Cancha[], club: Club) => acc.concat(club.canchas), []);
  }

  async solicitarPartido() {
    const nuevaCancha = this.canchasSugeridas.find(c => c.id === this.canchaSeleccionada) || { id: '', clubId: '', nombre: '', tipo: '', bloqueada: false };
    const nuevoPartido: Partido = {
      id: this.almacenamientoService.generateId(),
      equipo1: this.equipo,
      equipo2: { id: '', nombre: '', miembros: [] },
      fecha: this.fecha,
      hora: this.hora,
      lugar: nuevaCancha.nombre,
      cancha: nuevaCancha
    };

    await this.almacenamientoService.addPartido(nuevoPartido);
    this.navCtrl.navigateBack('/home');
  }
}
