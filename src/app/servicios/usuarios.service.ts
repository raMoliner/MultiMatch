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
    console.log('Usuarios cargados desde el almacenamiento:', this.usuarios);
  }

  async addUsuario(usuario: Usuario): Promise<void> {
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
    await this._storage?.set('usuarios', this.usuarios);
    console.log('Usuario agregado:', usuario);
  }

  async getUsuarios(): Promise<Usuario[]> {
    console.log('Recuperando usuarios:', this.usuarios);
    return this.usuarios;
  }

  async getUsuarioByEmail(email: string): Promise<Usuario | undefined> {
    const usuario = this.usuarios.find(user => user.email === email);
    console.log('Usuario encontrado por email:', usuario);
    return usuario;
  }

  async updateUsuario(updatedUsuario: Usuario): Promise<void> {
    const index = this.usuarios.findIndex(user => user.email === updatedUsuario.email);
    if (index > -1) {
      this.usuarios[index] = updatedUsuario;
      await this._storage?.set('usuarios', this.usuarios);
      console.log('Usuario actualizado:', updatedUsuario);
    }
  }

  async deleteUsuario(email: string): Promise<void> {
    this.usuarios = this.usuarios.filter(user => user.email !== email);
    await this._storage?.set('usuarios', this.usuarios);
    console.log('Usuario eliminado:', email);
  }
}
