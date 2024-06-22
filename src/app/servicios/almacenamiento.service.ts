import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { from, Observable } from 'rxjs';
import { Usuario, Equipo, Reserva, Partido } from '../models/models';

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
  }

  async getUsuarioByEmail(email: string): Promise<Usuario | undefined> {
    const usuarios = await this._storage?.get('usuarios') || [];
    return usuarios.find((user: Usuario) => user.email === email);
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
}
