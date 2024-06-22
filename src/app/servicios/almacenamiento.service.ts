import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
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
    
    if (await this.get('isLoggedIn') === null) {
      this.set('isLoggedIn', false);
    }
  }
  public async set(key: string, value: any): Promise<void> {
    await this._storage?.set(key, value);
  }

  public async get<T>(key: string): Promise<T | null> {
    return await this._storage?.get(key) as T | null;
  }

  public async remove(key: string): Promise<void> {
    await this._storage?.remove(key);
  }

  public async getAllUsuarios(): Promise<Usuario[]> {
    return await this.get<Usuario[]>('usuarios') || [];
  }

  public async setUsuarios(usuarios: Usuario[]): Promise<void> {
    await this.set('usuarios', usuarios);
  }

  public async getAllEquipos(): Promise<Equipo[]> {
    return await this.get<Equipo[]>('equipos') || [];
  }

  public async setEquipos(equipos: Equipo[]): Promise<void> {
    await this.set('equipos', equipos);
  }

  public async getAllReservas(): Promise<Reserva[]> {
    return await this.get<Reserva[]>('reservas') || [];
  }

  public async setReservas(reservas: Reserva[]): Promise<void> {
    await this.set('reservas', reservas);
  }

  public async getAllPartidos(): Promise<Partido[]> {
    return await this.get<Partido[]>('partidos') || [];
  }

  public async setPartidos(partidos: Partido[]): Promise<void> {
    await this.set('partidos', partidos);
  }
}
