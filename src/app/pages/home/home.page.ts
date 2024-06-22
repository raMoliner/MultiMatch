import { Component, OnInit } from '@angular/core';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  partidos: any[] = [];
  jugadoresSinEquipo: any[] = [];
  equiposBuscandoContrincante: any[] = [];
  segment: string = 'partidos';

  constructor(private almacenamientoService: AlmacenamientoService) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.partidos = (await this.almacenamientoService.getPartidos().toPromise()) || [];
    this.jugadoresSinEquipo = (await this.almacenamientoService.getUsuarios().toPromise()) || [];
    this.equiposBuscandoContrincante = (await this.almacenamientoService.getEquipos().toPromise()) || [];
  }

  segmentChanged(segment: string) {
    this.segment = segment;
  }

  verJugador(jugador: any) {
    // Implementar la lógica para ver el perfil del jugador
  }
}
