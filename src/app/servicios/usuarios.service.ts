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
    try {
      const storage = await this.storage.create();
      this._storage = storage;
      const storedUsers = await this._storage.get('usuarios');
      this.usuarios = storedUsers || [];
      console.log('Usuarios cargados desde el almacenamiento:', this.usuarios);
    } catch (error) {
      console.error('Error initializing storage:', error);
    }
  }

  async addUsuario(usuario: Usuario): Promise<void> {
    if (!this._storage) {
      console.error('Storage no se ha inicializado');
      return;
    }
    const exists = this.usuarios.some((user: Usuario) =>
      user.email === usuario.email ||
      user.rut === usuario.rut ||
      (user.nombre === usuario.nombre &&
       user.apellidoPaterno === usuario.apellidoPaterno &&
       user.apellidoMaterno === usuario.apellidoMaterno)
    );
    if (exists) {
      throw new Error('El usuario ya existe.');
    }
    this.usuarios.push(usuario);
    try {
      await this._storage.set('usuarios', this.usuarios);
      console.log('Usuario agregado:', usuario);
    } catch (error) {
      console.error('Error agregando usuario:', error);
    }
  }

  async getUsuarios(): Promise<Usuario[]> {
    if (!this._storage) {
      console.error('Storage no se ha inicializado');
      return [];
    }
    console.log('Recuperando usuarios:', this.usuarios);
    return this.usuarios;
  }

  async getUsuarioByEmail(email: string): Promise<Usuario | undefined> {
    if (!this._storage) {
      console.error('Storage no se ha inicializado');
      return undefined;
    }
    const usuario = this.usuarios.find(user => user.email === email);
    console.log('Usuario encontrado por email:', usuario);
    return usuario;
  }

  async updateUsuario(updatedUsuario: Usuario): Promise<void> {
    if (!this._storage) {
      console.error('Storage no se ha inicializado');
      return;
    }
    const index = this.usuarios.findIndex(user => user.email === updatedUsuario.email);
    if (index > -1) {
      this.usuarios[index] = updatedUsuario;
      try {
        await this._storage.set('usuarios', this.usuarios);
        console.log('Usuario actualizado:', updatedUsuario);
      } catch (error) {
        console.error('Error actualizando usuario:', error);
      }
    }
  }

  async deleteUsuario(email: string): Promise<void> {
    if (!this._storage) {
      console.error('Storage is not initialized');
      return;
    }
    this.usuarios = this.usuarios.filter(user => user.email !== email);
    try {
      await this._storage.set('usuarios', this.usuarios);
      console.log('Usuario eliminado:', email);
    } catch (error) {
      console.error('Error deleting usuario:', error);
    }
  }
}
