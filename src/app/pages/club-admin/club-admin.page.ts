import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { Club, Cancha } from 'src/app/models/models';

@Component({
  selector: 'app-club-admin',
  templateUrl: './club-admin.page.html',
  styleUrls: ['./club-admin.page.scss'],
})
export class ClubAdminPage implements OnInit {
  clubId: string;
  club: Club = { id: '', nombre: '', rut: '', direccion: '', comuna: '', canchas: [] };
  nombreCancha: string = '';
  tipoCancha: string = '';
  tamañoCancha: number = 5; // Asegúrate de inicializar tamañoCancha
  canchas: Cancha[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private almacenamientoService: AlmacenamientoService
  ) {
    this.clubId = this.route.snapshot.paramMap.get('clubId') || '';
  }

  ngOnInit() {
    this.loadClub();
  }

  async loadClub() {
    const clubs = await this.almacenamientoService.get<Club[]>('clubs');
    this.club = (clubs || []).find(c => c.id === this.clubId) || { id: '', nombre: '', rut: '', direccion: '', comuna: '', canchas: [] };
    this.canchas = this.club.canchas;
  }

  async addCancha() {
    const nuevaCancha: Cancha = {
      id: this.almacenamientoService.generateId(),
      clubId: this.club.id, // Cambiado de this.currentClub.id a this.club.id
      nombre: this.nombreCancha,
      tipo: this.tipoCancha,
      bloqueada: false,
      tamaño: this.tamañoCancha
    };
    await this.almacenamientoService.addCanchaToClub(this.clubId, nuevaCancha);
    this.loadClub();
  }

  async deleteCancha(canchaId: string) {
    await this.almacenamientoService.deleteCanchaFromClub(this.clubId, canchaId);
    this.loadClub();
  }
}
