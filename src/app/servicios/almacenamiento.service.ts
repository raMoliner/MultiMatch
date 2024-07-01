// almacenamiento.service.ts
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
    console.log(`Set ${key}:`, value);
    return this._storage?.set(key, value);
  }

  async get(key: string): Promise<any> {
    const value = await this._storage?.get(key);
    console.log(`Get ${key}:`, value);
    return value;
  }

  async clear(): Promise<void> {
    await this._storage?.clear();
    console.log('Almacenamiento limpiado');
  }

  // Métodos de Usuario
  setUsuarios(usuarios: Usuario[]): Promise<any> {
    return this._storage?.set('usuarios', usuarios) as Promise<any>;
  }

  getUsuarios(): Observable<Usuario[]> {
    return from(this._storage?.get('usuarios') || Promise.resolve([]));
  }

  async addUsuario(usuario: Usuario): Promise<void> {
    const usuarios = await this._storage?.get('usuarios') || [];
    usuarios.push(usuario);
    await this._storage?.set('usuarios', usuarios);
    console.log('Usuario agregado:', usuario);
  }

  async getUsuarioByEmail(email: string): Promise<Usuario | undefined> {
    const usuarios = await this._storage?.get('usuarios') || [];
    const usuario = usuarios.find((user: Usuario) => user.email === email);
    console.log('Usuario encontrado por email:', usuario);
    return usuario;
  }

  async updateUsuario(updatedUsuario: Usuario): Promise<void> {
    const usuarios = await this._storage?.get('usuarios') || [];
    const index = usuarios.findIndex((user: Usuario) => user.id === updatedUsuario.id);
    if (index > -1) {
      usuarios[index] = updatedUsuario;
      await this._storage?.set('usuarios', usuarios);
    }
  }

  async deleteUsuario(id: string): Promise<void> {
    let usuarios = await this._storage?.get('usuarios') || [];
    usuarios = usuarios.filter((user: Usuario) => user.id !== id);
    await this._storage?.set('usuarios', usuarios);
  }

  // Métodos de Equipo
  setEquipos(equipos: Equipo[]): Promise<any> {
    return this._storage?.set('equipos', equipos) as Promise<any>;
  }

  getEquipos(): Observable<Equipo[]> {
    return from(this._storage?.get('equipos') || Promise.resolve([]));
  }

  async addEquipo(equipo: Equipo): Promise<void> {
    const equipos = await this._storage?.get('equipos') || [];
    equipos.push(equipo);
    await this._storage?.set('equipos', equipos);
  }

  async updateEquipo(updatedEquipo: Equipo): Promise<void> {
    const equipos = await this._storage?.get('equipos') || [];
    const index = equipos.findIndex((e: Equipo) => e.id === updatedEquipo.id);
    if (index > -1) {
      equipos[index] = updatedEquipo;
      await this._storage?.set('equipos', equipos);
    }
  }

  async deleteEquipo(id: string): Promise<void> {
    let equipos = await this._storage?.get('equipos') || [];
    equipos = equipos.filter((e: Equipo) => e.id !== id);
    await this._storage?.set('equipos', equipos);
  }

  // Métodos de Reserva
  setReservas(reservas: Reserva[]): Promise<any> {
    return this._storage?.set('reservas', reservas) as Promise<any>;
  }

  getReservas(): Observable<Reserva[]> {
    return from(this._storage?.get('reservas') || Promise.resolve([]));
  }

  async addReserva(reserva: Reserva): Promise<void> {
    const reservas = await this._storage?.get('reservas') || [];
    reservas.push(reserva);
    await this._storage?.set('reservas', reservas);
  }

  async updateReserva(updatedReserva: Reserva): Promise<void> {
    const reservas = await this._storage?.get('reservas') || [];
    const index = reservas.findIndex((r: Reserva) => r.id === updatedReserva.id);
    if (index > -1) {
      reservas[index] = updatedReserva;
      await this._storage?.set('reservas', reservas);
    }
  }

  async deleteReserva(id: string): Promise<void> {
    let reservas = await this._storage?.get('reservas') || [];
    reservas = reservas.filter((r: Reserva) => r.id !== id);
    await this._storage?.set('reservas', reservas);
  }

  // Métodos de Partido
  setPartidos(partidos: Partido[]): Promise<any> {
    return this._storage?.set('partidos', partidos) as Promise<any>;
  }

  getPartidos(): Observable<Partido[]> {
    return from(this._storage?.get('partidos') || Promise.resolve([]));
  }

  async addPartido(partido: Partido): Promise<void> {
    const partidos = await this._storage?.get('partidos') || [];
    partidos.push(partido);
    await this._storage?.set('partidos', partidos);
  }

  async updatePartido(updatedPartido: Partido): Promise<void> {
    const partidos = await this._storage?.get('partidos') || [];
    const index = partidos.findIndex((p: Partido) => p.id === updatedPartido.id);
    if (index > -1) {
      partidos[index] = updatedPartido;
      await this._storage?.set('partidos', partidos);
    }
  }

  async deletePartido(id: string): Promise<void> {
    let partidos = await this._storage?.get('partidos') || [];
    partidos = partidos.filter((p: Partido) => p.id !== id);
    await this._storage?.set('partidos', partidos);
  }

  // Métodos de Club
  async addClub(club: Club): Promise<void> {
    const clubs = await this._storage?.get('clubs') || [];
    clubs.push(club);
    await this._storage?.set('clubs', clubs);
  }

  async updateClub(updatedClub: Club): Promise<void> {
    const clubs = await this._storage?.get('clubs') || [];
    const index = clubs.findIndex((c: Club) => c.id === updatedClub.id);
    if (index > -1) {
      clubs[index] = updatedClub;
      await this._storage?.set('clubs', clubs);
    }
  }

  async deleteClub(id: string): Promise<void> {
    let clubs = await this._storage?.get('clubs') || [];
    clubs = clubs.filter((c: Club) => c.id !== id);
    await this._storage?.set('clubs', clubs);
  }

  async addCanchaToClub(clubId: string, cancha: Cancha): Promise<void> {
    const clubs = await this._storage?.get('clubs') || [];
    const clubIndex = clubs.findIndex((c: Club) => c.id === clubId);
    if (clubIndex > -1) {
      clubs[clubIndex].canchas.push(cancha);
      await this._storage?.set('clubs', clubs);
    }
  }

  async deleteCanchaFromClub(clubId: string, canchaId: string): Promise<void> {
    const clubs = await this._storage?.get('clubs') || [];
    const clubIndex = clubs.findIndex((c: Club) => c.id === clubId);
    if (clubIndex > -1) {
      clubs[clubIndex].canchas = clubs[clubIndex].canchas.filter((cancha: Cancha) => cancha.id !== canchaId);
      await this._storage?.set('clubs', clubs);
    }
  }

  getClubs(): Observable<Club[]> {
    return from(this._storage?.get('clubs') || Promise.resolve([]));
  }

  generateId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
