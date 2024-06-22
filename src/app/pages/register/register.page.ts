import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { Usuario } from 'src/app/models/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private almacenamientoService: AlmacenamientoService
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      apellidoPaterno: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      apellidoMaterno: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      rut: ['', [Validators.required, Validators.pattern(/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/)]],
      edad: ['', [Validators.required, Validators.min(16)]],
      posicion: ['', Validators.required],
      foto: [''],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*\d)(?=.*[A-Z])/)]],
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const newUser: Usuario = { ...this.registerForm.value, id: this.generateId() };
      this.almacenamientoService.addUsuario(newUser).then(() => {
        this.presentAlert('Registro exitoso', 'Te has registrado correctamente');
        this.router.navigate(['/login']);
      }).catch((error: any) => {
        this.presentAlert('Error', 'Hubo un error en el registro: ' + (error.message || ''));
      });
    }
  }

  generateId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  takePicture() {
    console.log('Tomar foto');
  }

  async presentAlert(header: string, message: string) {
    const alert = document.createElement('ion-alert');
    alert.header = header;
    alert.message = message;
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    await alert.present();
  }
}
