import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { NavController, AlertController } from '@ionic/angular';
import { Equipo, Partido, Cancha, Club } from 'src/app/models/models';

@Component({
  selector: 'app-solicitar-partido',
  templateUrl: './solicitar-partido.page.html',
  styleUrls: ['./solicitar-partido.page.scss'],
})
export class SolicitarPartidoPage implements OnInit {
  equipoId: string = '';
  equipo: Equipo | null = null;
  canchasSugeridas: Cancha[] = [];
  fecha: string = '';
  hora: string = '';
  canchaSeleccionada: string = '';

  constructor(
    private route: ActivatedRoute,
    private almacenamientoService: AlmacenamientoService,
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.equipoId = this.route.snapshot.paramMap.get('equipoId') || '';
    this.loadEquipo();
    this.loadCanchasSugeridas();
  }

  async loadEquipo() {
    const equipos = await this.almacenamientoService.getEquipos().toPromise();
    if (equipos) {
      this.equipo = equipos.find(e => e.id === this.equipoId) || null;
    }
  }

  async loadCanchasSugeridas() {
    const clubes = await this.almacenamientoService.get('clubs');
    if (clubes) {
      this.canchasSugeridas = clubes.reduce((acc: Cancha[], club: Club) => acc.concat(club.canchas), []);
    }
  }

  async solicitarPartido() {
    if (!this.fecha || !this.hora || !this.canchaSeleccionada) {
      this.showErrorAlert('Faltan datos', 'Por favor complete todos los campos.');
      return;
    }

    const nuevoPartido: Partido = {
      id: this.almacenamientoService.generateId(),
      equipo1: this.equipo!,
      equipo2: { id: '', nombre: '', miembros: [] }, // Asignación temporal
      fecha: this.fecha,
      hora: this.hora,
      lugar: this.canchaSeleccionada,
    };

    await this.almacenamientoService.addPartido(nuevoPartido);
    this.navCtrl.navigateBack('/home');
  }

  private async showErrorAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}

