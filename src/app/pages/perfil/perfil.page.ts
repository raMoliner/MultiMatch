import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { Usuario } from 'src/app/models/models';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  perfilUsuario: Usuario | null = null;
  perfilForm: FormGroup;

  constructor(
    private almacenamientoService: AlmacenamientoService,
    private fb: FormBuilder,
    private alertController: AlertController
  ) {
    this.perfilForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z]+$/)]],
      apellidoPaterno: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z]+$/)]],
      apellidoMaterno: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      rut: ['', [Validators.required, Validators.pattern(/^\d{7,8}-[\dKk]$/)]],
      edad: ['', [Validators.required, Validators.min(18)]],
      posicion: [''],
      foto: ['']
    });
  }

  ngOnInit() {
    this.loadPerfil();
  }

  async loadPerfil() {
    try {
      const currentUser = await this.almacenamientoService.get<Usuario>('currentUser');
      this.perfilUsuario = currentUser;
      if (this.perfilUsuario) {
        this.perfilForm.patchValue(this.perfilUsuario);
      }
    } catch (error) {
      this.showErrorAlert('Error cargando el perfil', (error as Error).message);
    }
  }

  async actualizarPerfil() {
    if (this.perfilUsuario && this.perfilForm.valid) {
      const updatedUsuario = { ...this.perfilUsuario, ...this.perfilForm.value };
      try {
        await this.almacenamientoService.updateUsuario(updatedUsuario);
        this.showSuccessAlert('Perfil actualizado con éxito');
      } catch (error) {
        this.showErrorAlert('Error actualizando el perfil', (error as Error).message);
      }
    }
  }

  tomarFoto() {
    console.log('Tomar foto');
  }

  private async showErrorAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  private async showSuccessAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
