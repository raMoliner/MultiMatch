import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private _storage: Storage | null = null;
  private usuarios: Usuario[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    const storedUsers = await this._storage?.get('usuarios');
    this.usuarios = storedUsers || [];
  }

  async addUsuario(usuario: Usuario): Promise<void> {
    this.usuarios.push(usuario);
    await this._storage?.set('usuarios', this.usuarios);
  }

  async getUsuarios(): Promise<Usuario[]> {
    return this.usuarios;
  }

  async getUsuarioByEmail(email: string): Promise<Usuario | undefined> {
    return this.usuarios.find(user => user.email === email);
  }

  async updateUsuario(updatedUsuario: Usuario): Promise<void> {
    const index = this.usuarios.findIndex(user => user.email === updatedUsuario.email);
    if (index > -1) {
      this.usuarios[index] = updatedUsuario;
      await this._storage?.set('usuarios', this.usuarios);
    }
  }

  async deleteUsuario(email: string): Promise<void> {
    this.usuarios = this.usuarios.filter(user => user.email !== email);
    await this._storage?.set('usuarios', this.usuarios);
  }
}
