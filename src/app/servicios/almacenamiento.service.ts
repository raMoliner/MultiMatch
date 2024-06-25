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

  async set<T>(key: string, value: T): Promise<void> {
    try {
      console.log(`Set ${key}:`, value);
      await this._storage?.set(key, value);
    } catch (error) {
      console.error(`Error setting ${key}:`, error);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this._storage?.get(key);
      console.log(`Get ${key}:`, value);
      return value;
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return null;
    }
  }

  async clear(): Promise<void> {
    try {
      await this._storage?.clear();
      console.log('Almacenamiento limpiado');
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }

  // Métodos de Usuario
  setUsuarios(usuarios: Usuario[]): Promise<void> {
    return this.set('usuarios', usuarios);
  }

  getUsuarios(): Observable<Usuario[]> {
    return from(this.get<Usuario[]>('usuarios').then(data => data || []));
  }

  async addUsuario(usuario: Usuario): Promise<void> {
    try {
      const usuarios = await this.get<Usuario[]>('usuarios') || [];
      usuarios.push(usuario);
      await this.set('usuarios', usuarios);
      console.log('Usuario agregado:', usuario);
    } catch (error) {
      console.error('Error adding usuario:', error);
    }
  }

  async getUsuarioByEmail(email: string): Promise<Usuario | undefined> {
    try {
      const usuarios = await this.get<Usuario[]>('usuarios') || [];
      const usuario = usuarios.find(user => user.email === email);
      console.log('Usuario encontrado por email:', usuario);
      return usuario;
    } catch (error) {
      console.error('Error getting usuario by email:', error);
      return undefined;
    }
  }

  async updateUsuario(updatedUsuario: Usuario): Promise<void> {
    try {
      const usuarios = await this.get<Usuario[]>('usuarios') || [];
      const index = usuarios.findIndex(user => user.id === updatedUsuario.id);
      if (index > -1) {
        usuarios[index] = updatedUsuario;
        await this.set('usuarios', usuarios);
      }
    } catch (error) {
      console.error('Error updating usuario:', error);
    }
  }

  async deleteUsuario(id: string): Promise<void> {
    try {
      let usuarios = await this.get<Usuario[]>('usuarios') || [];
      usuarios = usuarios.filter(user => user.id !== id);
      await this.set('usuarios', usuarios);
    } catch (error) {
      console.error('Error deleting usuario:', error);
    }
  }

  // Métodos de Equipo
  setEquipos(equipos: Equipo[]): Promise<void> {
    return this.set('equipos', equipos);
  }

  getEquipos(): Observable<Equipo[]> {
    return from(this.get<Equipo[]>('equipos').then(data => data || []));
  }

  async addEquipo(equipo: Equipo): Promise<void> {
    try {
      const equipos = await this.get<Equipo[]>('equipos') || [];
      equipos.push(equipo);
      await this.set('equipos', equipos);
    } catch (error) {
      console.error('Error adding equipo:', error);
    }
  }

  async updateEquipo(updatedEquipo: Equipo): Promise<void> {
    try {
      const equipos = await this.get<Equipo[]>('equipos') || [];
      const index = equipos.findIndex(e => e.id === updatedEquipo.id);
      if (index > -1) {
        equipos[index] = updatedEquipo;
        await this.set('equipos', equipos);
      }
    } catch (error) {
      console.error('Error updating equipo:', error);
    }
  }

  async deleteEquipo(id: string): Promise<void> {
    try {
      let equipos = await this.get<Equipo[]>('equipos') || [];
      equipos = equipos.filter(e => e.id !== id);
      await this.set('equipos', equipos);
    } catch (error) {
      console.error('Error deleting equipo:', error);
    }
  }

  // Métodos de Reserva
  setReservas(reservas: Reserva[]): Promise<void> {
    return this.set('reservas', reservas);
  }

  getReservas(): Observable<Reserva[]> {
    return from(this.get<Reserva[]>('reservas').then(data => data || []));
  }

  async addReserva(reserva: Reserva): Promise<void> {
    try {
      const reservas = await this.get<Reserva[]>('reservas') || [];
      reservas.push(reserva);
      await this.set('reservas', reservas);
    } catch (error) {
      console.error('Error adding reserva:', error);
    }
  }

  async updateReserva(updatedReserva: Reserva): Promise<void> {
    try {
      const reservas = await this.get<Reserva[]>('reservas') || [];
      const index = reservas.findIndex(r => r.id === updatedReserva.id);
      if (index > -1) {
        reservas[index] = updatedReserva;
        await this.set('reservas', reservas);
      }
    } catch (error) {
      console.error('Error updating reserva:', error);
    }
  }

  async deleteReserva(id: string): Promise<void> {
    try {
      let reservas = await this.get<Reserva[]>('reservas') || [];
      reservas = reservas.filter(r => r.id !== id);
      await this.set('reservas', reservas);
    } catch (error) {
      console.error('Error deleting reserva:', error);
    }
  }

  // Métodos de Partido
  setPartidos(partidos: Partido[]): Promise<void> {
    return this.set('partidos', partidos);
  }

  getPartidos(): Observable<Partido[]> {
    return from(this.get<Partido[]>('partidos').then(data => data || []));
  }

  async addPartido(partido: Partido): Promise<void> {
    try {
      const partidos = await this.get<Partido[]>('partidos') || [];
      partidos.push(partido);
      await this.set('partidos', partidos);
    } catch (error) {
      console.error('Error adding partido:', error);
    }
  }

  async updatePartido(updatedPartido: Partido): Promise<void> {
    try {
      const partidos = await this.get<Partido[]>('partidos') || [];
      const index = partidos.findIndex(p => p.id === updatedPartido.id);
      if (index > -1) {
        partidos[index] = updatedPartido;
        await this.set('partidos', partidos);
      }
    } catch (error) {
      console.error('Error updating partido:', error);
    }
  }

  async deletePartido(id: string): Promise<void> {
    try {
      let partidos = await this.get<Partido[]>('partidos') || [];
      partidos = partidos.filter(p => p.id !== id);
      await this.set('partidos', partidos);
    } catch (error) {
      console.error('Error deleting partido:', error);
    }
  }
}
