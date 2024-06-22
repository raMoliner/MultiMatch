import { Component, OnInit } from '@angular/core';
import { PartidosService } from 'src/app/servicios/partidos.service';
import { Partido } from 'src/app/models/models';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.page.html',
  styleUrls: ['./partido.page.scss'],
})
export class PartidoPage implements OnInit {
  partidos: Partido[] = [];

  constructor(private partidosService: PartidosService) {}

  ngOnInit() {
    this.partidosService.getPartidos().then((partidos: Partido[]) => {
      this.partidos = partidos;
    });
  }

  nuevoPartido() {
    // Lógica para agregar un nuevo partido
  }
}
