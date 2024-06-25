import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Equipo } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  private _storage: Storage | null = null;
  private equipos: Equipo[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    try {
      const storage = await this.storage.create();
      this._storage = storage;
      const storedEquipos = await this._storage.get('equipos');
      this.equipos = storedEquipos || [];
    } catch (error) {
      console.error('Error inicializando storage:', error);
    }
  }

  async addEquipo(equipo: Equipo): Promise<void> {
    if (!this._storage) {
      console.error('Storage no esta inicializado');
      return;
    }
    this.equipos.push(equipo);
    await this._storage.set('equipos', this.equipos);
  }

  async getEquipos(): Promise<Equipo[]> {
    if (!this._storage) {
      console.error('Storage no esta inicializado');
      return [];
    }
    return this.equipos;
  }

  async updateEquipo(updatedEquipo: Equipo): Promise<void> {
    if (!this._storage) {
      console.error('Storage no esta inicializado');
      return;
    }
    const index = this.equipos.findIndex(e => e.id === updatedEquipo.id);
    if (index > -1) {
      this.equipos[index] = updatedEquipo;
      await this._storage.set('equipos', this.equipos);
    }
  }

  async deleteEquipo(id: string): Promise<void> {
    if (!this._storage) {
      console.error('Storage no esta inicializado');
      return;
    }
    this.equipos = this.equipos.filter(e => e.id !== id);
    await this._storage.set('equipos', this.equipos);
  }
}
