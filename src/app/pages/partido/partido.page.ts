import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/servicios/api.service';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { Partido, Equipo } from 'src/app/models/models';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.page.html',
  styleUrls: ['./partido.page.scss'],
})
export class PartidoPage implements OnInit {
  partidos: Partido[] = [];
  equipo: Equipo = { id: '', nombre: '', miembros: [] }; // Inicializar equipo

  constructor(
    private apiService: ApiService,
    private almacenamientoService: AlmacenamientoService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarPartidos();
  }

  async cargarPartidos() {
    this.partidos = await this.almacenamientoService.getAllPartidos();
    if (this.partidos.length === 0) {
      this.apiService.obtenerPartidos().subscribe(async data => {
        this.partidos = data;
        await this.almacenamientoService.setPartidos(data);
      });
    }
  }

  async nuevoPartido() {
    const alert = await this.alertController.create({
      header: 'Nuevo Partido',
      inputs: [
        { name: 'fecha', type: 'date', placeholder: 'Fecha' },
        { name: 'hora', type: 'time', placeholder: 'Hora' },
        { name: 'lugar', type: 'text', placeholder: 'Lugar' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Crear',
          handler: async (data) => {
            const nuevoPartido: Partido = {
              id: '', fecha: data.fecha, hora: data.hora, lugar: data.lugar,
              equipo1: this.equipo, equipo2: this.equipo // Esto es un ejemplo, ajustar según tu lógica
            };
            this.partidos.push(nuevoPartido);
            await this.almacenamientoService.setPartidos(this.partidos);
          }
        }
      ]
    });

    await alert.present();
  }
}
