import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/servicios/api.service';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { Equipo, Usuario } from 'src/app/models/models';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.page.html',
  styleUrls: ['./equipo.page.scss'],
})
export class EquipoPage implements OnInit {
  equipo: Equipo = { id: '', nombre: '', miembros: [] };

  constructor(
    private apiService: ApiService,
    private almacenamientoService: AlmacenamientoService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarEquipo();
  }

  async cargarEquipo() {
    const equipos = await this.almacenamientoService.getAllEquipos();
    if (equipos.length > 0) {
      this.equipo = equipos[0]; // Asumiendo que solo hay un equipo por usuario, ajustar según tus necesidades.
    } else {
      this.apiService.obtenerEquipos().subscribe(async data => {
        this.equipo = data[0];
        await this.almacenamientoService.setEquipos(data);
      });
    }
  }

  async agregarMiembro() {
    const alert = await this.alertController.create({
      header: 'Agregar Miembro',
      inputs: [
        { name: 'nombre', type: 'text', placeholder: 'Nombre' },
        { name: 'apellidoPaterno', type: 'text', placeholder: 'Apellido Paterno' },
        { name: 'apellidoMaterno', type: 'text', placeholder: 'Apellido Materno' },
        { name: 'email', type: 'email', placeholder: 'Email' },
        { name: 'rut', type: 'text', placeholder: 'RUT' },
        { name: 'edad', type: 'number', placeholder: 'Edad' },
        { name: 'posicion', type: 'text', placeholder: 'Posición' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Agregar',
          handler: async (data) => {
            const nuevoMiembro: Usuario = {
              id: '', nombre: data.nombre, apellidoPaterno: data.apellidoPaterno,
              apellidoMaterno: data.apellidoMaterno, email: data.email, rut: data.rut,
              edad: parseInt(data.edad, 10), posicion: data.posicion
            };
            this.equipo.miembros.push(nuevoMiembro);
            await this.almacenamientoService.setEquipos([this.equipo]);
          }
        }
      ]
    });

    await alert.present();
  }
}

