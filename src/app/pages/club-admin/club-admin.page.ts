import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { NavController, AlertController } from '@ionic/angular';
import { Club, Cancha } from 'src/app/models/models';

@Component({
  selector: 'app-club-admin',
  templateUrl: './club-admin.page.html',
  styleUrls: ['./club-admin.page.scss'],
})
export class ClubAdminPage implements OnInit {
  clubId: string = '';
  club: Club | null = null;
  canchas: Cancha[] = [];
  nombreCancha: string = '';
  tipoCancha: string = '';

  constructor(
    private route: ActivatedRoute,
    private almacenamientoService: AlmacenamientoService,
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.clubId = this.route.snapshot.paramMap.get('clubId') || '';
    this.loadClub();
  }

  async loadClub() {
    const clubs = await this.almacenamientoService.getClubs().toPromise();
    if (clubs) {
      this.club = clubs.find(c => c.id === this.clubId) || null;
      this.canchas = this.club ? this.club.canchas : [];
    }
  }

  async addCancha() {
    if (!this.nombreCancha || !this.tipoCancha) {
      this.showErrorAlert('Faltan datos', 'Por favor complete todos los campos.');
      return;
    }

    const nuevaCancha: Cancha = {
      id: this.almacenamientoService.generateId(),
      clubId: this.clubId,
      nombre: this.nombreCancha,
      tipo: this.tipoCancha,
    };

    await this.almacenamientoService.addCanchaToClub(this.clubId, nuevaCancha);
    this.loadClub();
  }

  async deleteCancha(canchaId: string) {
    await this.almacenamientoService.deleteCanchaFromClub(this.clubId, canchaId);
    this.loadClub();
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
