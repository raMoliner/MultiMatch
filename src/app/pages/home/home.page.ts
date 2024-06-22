import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { Partido, Usuario, Equipo } from 'src/app/models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  segment: string = 'partidos';
  partidos: Partido[] = [];
  jugadores: Usuario[] = [];
  equiposBuscandoContrincante: Equipo[] = [];

  constructor(
    private apiService: ApiService,
    private almacenamientoService: AlmacenamientoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.almacenamientoService.get('isLoggedIn').then(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigate(['/login']);
      } else {
        this.cargarDatos();
      }
    });
  }

  segmentChanged(segment: string) {
    this.segment = segment;
  }

  cargarDatos() {
    this.apiService.obtenerPartidos().subscribe(partidos => {
      this.partidos = partidos;
    });

    this.apiService.obtenerJugadoresSinEquipo().subscribe(jugadores => {
      this.jugadores = jugadores;
    });

    this.apiService.obtenerEquiposBuscandoContrincante().subscribe(equipos => {
      this.equiposBuscandoContrincante = equipos;
    });
  }

  verJugador(jugador: Usuario) {
    this.router.navigate(['/perfil', jugador.id]);
  }
}
