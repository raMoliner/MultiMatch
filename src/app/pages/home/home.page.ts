import { Component, OnInit } from '@angular/core';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  partidos: any[] = [];
  jugadoresSinEquipo: any[] = [];
  equiposBuscandoContrincante: any[] = [];
  jugadoresDestacados: any[] = [];

  constructor(
    private almacenamientoService: AlmacenamientoService,
    private http: HttpClient,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {
    this.loadData();
    this.loadDestacados();
  }

  async loadData() {
    this.partidos = await this.almacenamientoService.get('partidos') || [];
    this.jugadoresSinEquipo = await this.almacenamientoService.get('usuarios') || [];
    this.equiposBuscandoContrincante = await this.almacenamientoService.get('equipos') || [];
  }

  loadDestacados() {
    this.http.get('https://bobsburgers-api.herokuapp.com/characters')
      .subscribe((data: any) => {
        this.jugadoresDestacados = this.getRandomElements(data, 3);
      });
  }

  getRandomElements(arr: any[], count: number): any[] {
    const shuffled = arr.slice(0);
    let i = arr.length;
    let temp;
    let index;
    while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(0, count);
  }

  verJugador(jugador: any) {
    this.navCtrl.navigateForward(`/jugador/${jugador.id}`);
  }

}
