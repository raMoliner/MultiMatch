import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/servicios/api.service';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { Reserva, Equipo } from 'src/app/models/models';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {
  reservas: Reserva[] = [];
  equipo: Equipo = { id: '', nombre: '', miembros: [] }; // Inicializar equipo

  constructor(
    private apiService: ApiService,
    private almacenamientoService: AlmacenamientoService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarReservas();
  }

  async cargarReservas() {
    this.reservas = await this.almacenamientoService.getAllReservas();
    if (this.reservas.length === 0) {
      this.apiService.obtenerReservas().subscribe(async data => {
        this.reservas = data;
        await this.almacenamientoService.setReservas(data);
      });
    }
  }

  async nuevaReserva() {
    const alert = await this.alertController.create({
      header: 'Nueva Reserva',
      inputs: [
        { name: 'fecha', type: 'date', placeholder: 'Fecha' },
        { name: 'hora', type: 'time', placeholder: 'Hora' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Reservar',
          handler: async (data) => {
            const nuevaReserva: Reserva = {
              id: '', fecha: data.fecha, hora: data.hora, equipo: this.equipo
            };
            this.reservas.push(nuevaReserva);
            await this.almacenamientoService.setReservas(this.reservas);
          }
        }
      ]
    });

    await alert.present();
  }
}
