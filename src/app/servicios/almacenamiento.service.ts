import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { from, Observable } from 'rxjs';
import { Usuario, Equipo, Reserva, Partido, Club, Cancha } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AlmacenamientoService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async set(key: string, value: any): Promise<any> {
    return this._storage?.set(key, value) ?? Promise.resolve();
  }

  async get<T>(key: string): Promise<T | null> {
    return this._storage?.get(key) ?? Promise.resolve(null);
  }

  async clear(): Promise<void> {
    await this._storage?.clear();
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Métodos de Usuario
  setUsuarios(usuarios: Usuario[]): Promise<any> {
    return this._storage?.set('usuarios', usuarios) ?? Promise.resolve();
  }

  getUsuarios(): Observable<Usuario[]> {
    return from(this._storage?.get('usuarios') || Promise.resolve([]));
  }

  async addUsuario(usuario: Usuario): Promise<void> {
    const usuarios = await this.get<Usuario[]>('usuarios') || [];
    usuarios.push(usuario);
    await this.set('usuarios', usuarios);
  }

  async getUsuarioByEmail(email: string): Promise<Usuario | undefined> {
    const usuarios = await this.get<Usuario[]>('usuarios') || [];
    return usuarios.find((user: Usuario) => user.email === email);
  }

  async updateUsuario(updatedUsuario: Usuario): Promise<void> {
    const usuarios = await this.get<Usuario[]>('usuarios') || [];
    const index = usuarios.findIndex((user: Usuario) => user.id === updatedUsuario.id);
    if (index > -1) {
      usuarios[index] = updatedUsuario;
      await this.set('usuarios', usuarios);
    }
  }

  async deleteUsuario(id: string): Promise<void> {
    let usuarios = await this.get<Usuario[]>('usuarios') || [];
    usuarios = usuarios.filter((user: Usuario) => user.id !== id);
    await this.set('usuarios', usuarios);
  }

  async getCurrentUser(): Promise<Usuario> {
    const user = await this.get<Usuario>('currentUser');
    if (!user) throw new Error('No current user found');
    return user;
  }

  // Métodos de Equipo
  setEquipos(equipos: Equipo[]): Promise<any> {
    return this.set('equipos', equipos);
  }

  getEquipos(): Observable<Equipo[]> {
    return from(this.get<Equipo[]>('equipos').then(data => data || []));
  }

  async addEquipo(equipo: Equipo): Promise<void> {
    const equipos = await this.get<Equipo[]>('equipos') || [];
    equipos.push(equipo);
    await this.set('equipos', equipos);
  }

  async updateEquipo(updatedEquipo: Equipo): Promise<void> {
    const equipos = await this.get<Equipo[]>('equipos') || [];
    const index = equipos.findIndex((e: Equipo) => e.id === updatedEquipo.id);
    if (index > -1) {
      equipos[index] = updatedEquipo;
      await this.set('equipos', equipos);
    }
  }

  async deleteEquipo(id: string): Promise<void> {
    let equipos = await this.get<Equipo[]>('equipos') || [];
    equipos = equipos.filter((e: Equipo) => e.id !== id);
    await this.set('equipos', equipos);
  }

  // Métodos de Reserva
  setReservas(reservas: Reserva[]): Promise<any> {
    return this.set('reservas', reservas);
  }

  getReservas(): Observable<Reserva[]> {
    return from(this.get<Reserva[]>('reservas').then(data => data || []));
  }

  async addReserva(reserva: Reserva): Promise<void> {
    const reservas = await this.get<Reserva[]>('reservas') || [];
    reservas.push(reserva);
    await this.set('reservas', reservas);
  }

  async updateReserva(updatedReserva: Reserva): Promise<void> {
    const reservas = await this.get<Reserva[]>('reservas') || [];
    const index = reservas.findIndex((r: Reserva) => r.id === updatedReserva.id);
    if (index > -1) {
      reservas[index] = updatedReserva;
      await this.set('reservas', reservas);
    }
  }

  async deleteReserva(id: string): Promise<void> {
    let reservas = await this.get<Reserva[]>('reservas') || [];
    reservas = reservas.filter((r: Reserva) => r.id !== id);
    await this.set('reservas', reservas);
  }

  // Métodos de Partido
  setPartidos(partidos: Partido[]): Promise<any> {
    return this.set('partidos', partidos);
  }

  getPartidos(): Observable<Partido[]> {
    return from(this.get<Partido[]>('partidos').then(data => data || []));
  }

  async addPartido(partido: Partido): Promise<void> {
    const partidos = await this.get<Partido[]>('partidos') || [];
    partidos.push(partido);
    await this.set('partidos', partidos);
  }

  async updatePartido(updatedPartido: Partido): Promise<void> {
    const partidos = await this.get<Partido[]>('partidos') || [];
    const index = partidos.findIndex((p: Partido) => p.id === updatedPartido.id);
    if (index > -1) {
      partidos[index] = updatedPartido;
      await this.set('partidos', partidos);
    }
  }

  async deletePartido(id: string): Promise<void> {
    let partidos = await this.get<Partido[]>('partidos') || [];
    partidos = partidos.filter((p: Partido) => p.id !== id);
    await this.set('partidos', partidos);
  }

  // Métodos de Club
  setClubs(clubs: Club[]): Promise<any> {
    return this._storage?.set('clubs', clubs) ?? Promise.resolve();
  }

  getClubs(): Observable<Club[]> {
    return from(this._storage?.get('clubs') || Promise.resolve([]));
  }

  async addClub(club: Club): Promise<void> {
    const clubs = await this.get<Club[]>('clubs') || [];
    clubs.push(club);
    await this.set('clubs', clubs);
  }

  async getClubById(id: string): Promise<Club | undefined> {
    const clubs = await this.get<Club[]>('clubs') || [];
    return clubs.find((club: Club) => club.id === id);
  }

  async updateClub(updatedClub: Club): Promise<void> {
    const clubs = await this.get<Club[]>('clubs') || [];
    const index = clubs.findIndex((club: Club) => club.id === updatedClub.id);
    if (index > -1) {
      clubs[index] = updatedClub;
      await this.set('clubs', clubs);
    }
  }

  async deleteClub(id: string): Promise<void> {
    let clubs = await this.get<Club[]>('clubs') || [];
    clubs = clubs.filter((club: Club) => club.id !== id);
    await this.set('clubs', clubs);
  }

  // Métodos de Cancha
  async addCanchaToClub(clubId: string, cancha: Cancha): Promise<void> {
    const clubs = await this.get<Club[]>('clubs') || [];
    const clubIndex = clubs.findIndex((c: Club) => c.id === clubId);
    if (clubIndex > -1) {
      clubs[clubIndex].canchas.push(cancha);
      await this.set('clubs', clubs);
    }
  }

  async deleteCanchaFromClub(clubId: string, canchaId: string): Promise<void> {
    const clubs = await this.get<Club[]>('clubs') || [];
    const clubIndex = clubs.findIndex((c: Club) => c.id === clubId);
    if (clubIndex > -1) {
      clubs[clubIndex].canchas = clubs[clubIndex].canchas.filter(cancha => cancha.id !== canchaId);
      await this.set('clubs', clubs);
    }
  }
}
