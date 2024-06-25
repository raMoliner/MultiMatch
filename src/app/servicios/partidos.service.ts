import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Partido } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {
  private _storage: Storage | null = null;
  private partidos: Partido[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    try {
      const storage = await this.storage.create();
      this._storage = storage;
      const storedPartidos = await this._storage.get('partidos');
      this.partidos = storedPartidos || [];
    } catch (error) {
      console.error('Error initializing storage:', error);
    }
  }

  async addPartido(partido: Partido): Promise<void> {
    if (!this._storage) {
      console.error('Storage is not initialized');
      return;
    }
    this.partidos.push(partido);
    try {
      await this._storage.set('partidos', this.partidos);
    } catch (error) {
      console.error('Error adding partido:', error);
    }
  }

  async getPartidos(): Promise<Partido[]> {
    if (!this._storage) {
      console.error('Storage is not initialized');
      return [];
    }
    return this.partidos;
  }

  async updatePartido(updatedPartido: Partido): Promise<void> {
    if (!this._storage) {
      console.error('Storage is not initialized');
      return;
    }
    const index = this.partidos.findIndex(p => p.id === updatedPartido.id);
    if (index > -1) {
      this.partidos[index] = updatedPartido;
      try {
        await this._storage.set('partidos', this.partidos);
      } catch (error) {
        console.error('Error updating partido:', error);
      }
    }
  }

  async deletePartido(id: string): Promise<void> {
    if (!this._storage) {
      console.error('Storage is not initialized');
      return;
    }
    this.partidos = this.partidos.filter(p => p.id !== id);
    try {
      await this._storage.set('partidos', this.partidos);
    } catch (error) {
      console.error('Error deleting partido:', error);
    }
  }
}
