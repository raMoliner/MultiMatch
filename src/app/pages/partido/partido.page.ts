import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Partido } from 'src/app/models/models';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.page.html',
  styleUrls: ['./partido.page.scss'],
})
export class PartidoPage implements OnInit {
  partidos: Partido[] = []; // Inicializar partidos

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cargarPartidos();
  }

  cargarPartidos() {
    this.apiService.obtenerPartidos().subscribe(data => {
      this.partidos = data;
    });
  }

  nuevoPartido() {
    // Lógica para crear un nuevo partido
  }
}
