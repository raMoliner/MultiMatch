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
    const storage = await this.storage.create();
    this._storage = storage;
    const storedPartidos = await this._storage?.get('partidos');
    this.partidos = storedPartidos || [];
  }

  async addPartido(partido: Partido): Promise<void> {
    this.partidos.push(partido);
    await this._storage?.set('partidos', this.partidos);
  }

  async getPartidos(): Promise<Partido[]> {
    return this.partidos;
  }

  async updatePartido(updatedPartido: Partido): Promise<void> {
    const index = this.partidos.findIndex(p => p.id === updatedPartido.id);
    if (index > -1) {
      this.partidos[index] = updatedPartido;
      await this._storage?.set('partidos', this.partidos);
    }
  }

  async deletePartido(id: string): Promise<void> {
    this.partidos = this.partidos.filter(p => p.id !== id);
    await this._storage?.set('partidos', this.partidos);
  }
}
