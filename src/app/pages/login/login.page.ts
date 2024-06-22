import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private almacenamientoService: AlmacenamientoService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onLogin() {
    this.almacenamientoService.getUsuarioByEmail(this.loginForm.value.email).then((usuario) => {
      if (usuario && usuario.password === this.loginForm.value.password) {
        this.router.navigate(['/home']);
      } else {
        this.presentAlert('Error', 'Email o contraseña incorrectos');
      }
    }).catch((error: any) => {
      this.presentAlert('Error', 'Hubo un error en el login: ' + (error.message || ''));
    });
  }

  irARegistro() {
    this.router.navigate(['/register']);
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
