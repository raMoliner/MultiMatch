import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Equipo } from 'src/app/models/models';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.page.html',
  styleUrls: ['./equipo.page.scss'],
})
export class EquipoPage implements OnInit {
  equipo: Equipo = { id: '', nombre: '', miembros: [] }; // Inicializar equipo

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cargarEquipo();
  }

  cargarEquipo() {
    this.apiService.obtenerEquipos().subscribe(data => {
      this.equipo = data[0]; // Asumiendo que solo hay un equipo por usuario, ajusta según tus necesidades.
    });
  }

  agregarMiembro() {
    // Lógica para agregar un nuevo miembro al equipo
  }
}
