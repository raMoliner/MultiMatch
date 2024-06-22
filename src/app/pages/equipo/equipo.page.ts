import { Component, OnInit } from '@angular/core';
import { EquiposService } from 'src/app/servicios/equipos.service';
import { Equipo } from 'src/app/models/models';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.page.html',
  styleUrls: ['./equipo.page.scss'],
})
export class EquipoPage implements OnInit {
  equipos: Equipo[] = [];

  constructor(private equiposService: EquiposService) {}

  ngOnInit() {
    this.equiposService.getEquipos().then((equipos: Equipo[]) => {
      this.equipos = equipos;
    });
  }

  agregarMiembro(equipo: Equipo) {
    // Lógica para agregar un miembro al equipo
  }
}
