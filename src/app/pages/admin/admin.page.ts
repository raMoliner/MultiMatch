import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { Club, Cancha, Equipo, Usuario } from 'src/app/models/models';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  userType: string = '';
  clubId: string = '';
  equipoId: string = '';
  club: Club | null = null;
  equipo: Equipo | null = null;
  canchas: Cancha[] = [];
  miembros: Usuario[] = [];
  miembroId: string = '';
  nombreCancha: string = '';
  tipoCancha: string = '';
  tamañoCancha: number = 5;

  constructor(
    private route: ActivatedRoute,
    private almacenamientoService: AlmacenamientoService
  ) {}

  async ngOnInit() {
    const currentUser = await this.almacenamientoService.getCurrentUser();
    if (currentUser) {
      this.userType = currentUser.tipoUsuario;
      if (this.userType === 'club') {
        this.clubId = currentUser.id;
        this.loadClub();
      } else if (this.userType === 'jugador') {
        this.equipoId = currentUser.equipo || '';
        this.loadEquipo();
      }
    }
  }

  async loadClub() {
    const clubs = await this.almacenamientoService.get<Club[]>('clubs');
    this.club = (clubs || []).find(c => c.id === this.clubId) || null;
    this.canchas = this.club?.canchas || [];
  }

  async addCancha() {
    const nuevaCancha: Cancha = {
      id: this.almacenamientoService.generateId(),
      clubId: this.club?.id || '',
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

  async loadEquipo() {
    const equipos = await this.almacenamientoService.getEquipos().toPromise();
    this.equipo = equipos ? equipos.find(e => e.id === this.equipoId) || null : null;
    if (this.equipo) {
      this.miembros = await this.almacenamientoService.getUsuariosByIds(this.equipo.miembros);
    }
  }

  async agregarMiembro() {
    if (this.equipo) {
      const miembro = await this.almacenamientoService.getUsuarioById(this.miembroId);
      if (miembro) {
        this.equipo.miembros.push(miembro.id);
        await this.almacenamientoService.updateEquipo(this.equipo);
        this.loadEquipo();
      }
    }
  }
}
