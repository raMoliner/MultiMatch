import { Component, OnInit } from '@angular/core';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { HttpClient } from '@angular/common/http';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { Partido, Usuario, Equipo, Club, Cancha } from 'src/app/models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  partidos: Partido[] = [];
  jugadoresSinEquipo: Usuario[] = [];
  equiposBuscandoContrincante: Equipo[] = [];
  jugadoresDestacados: any[] = [];
  isLoading = true;

  constructor(
    private almacenamientoService: AlmacenamientoService,
    private http: HttpClient,
    private navCtrl: NavController,
    private alertController: AlertController,
    private loadingController: LoadingController,
  ) {}

  ngOnInit() {
    this.loadData();
    this.loadDestacados();
  }

  async loadData() {
    const loading = await this.loadingController.create({
      message: 'Cargando',
    });
    await loading.present();

    try {
      this.partidos = await this.almacenamientoService.getPartidos().toPromise() || [];
      this.jugadoresSinEquipo = await this.almacenamientoService.getUsuarios().toPromise() || [];
      this.equiposBuscandoContrincante = await this.almacenamientoService.getEquipos().toPromise() || [];
    } catch (error) {
      this.showErrorAlert('Error cargando data', (error as Error).message);
    } finally {
      this.isLoading = false;
      loading.dismiss();
    }
  }

  loadDestacados() {
    this.http.get<any[]>('https://bobsburgers-api.herokuapp.com/characters')
      .subscribe(
        data => {
          this.jugadoresDestacados = this.getRandomElements(data, 3);
        },
        error => {
          this.showErrorAlert('Error cargando API', (error as Error).message);
        }
      );
  }

  getRandomElements<T>(arr: T[], count: number): T[] {
    const shuffled = arr.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  }

  verJugador(jugador: any) {
    this.navCtrl.navigateForward(`/jugador/${jugador.id}`);
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  private async showErrorAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
