import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { AlertController, NavController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private almacenamientoService: AlmacenamientoService,
    private alertController: AlertController,
    private navCtrl: NavController,
    private cd: ChangeDetectorRef
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() { }

  async onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        const usuario = await this.almacenamientoService.getUsuarioByEmail(email);
        console.log('Login attempt for:', email, 'Found user:', usuario);
        if (usuario && usuario.password === password) {
          await this.almacenamientoService.set('isLoggedIn', true);
          await this.almacenamientoService.set('currentUser', usuario);
          console.log('User logged in and set as current user:', usuario);
          this.navCtrl.navigateRoot('/home');
          this.cd.detectChanges();
        } else {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Email o contraseña incorrectos.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      } catch (error) {
        const alert = await this.alertController.create({
          header: 'Error',
          message: `Hubo un error en el login: ${(error as Error).message}`,
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }

  irARegistro() {
    console.log("Navigating to /register");
    this.navCtrl.navigateForward('/register');
  }
}
