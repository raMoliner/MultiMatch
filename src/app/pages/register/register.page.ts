import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  esClub: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private navCtrl: NavController,
    private alertController: AlertController
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rut: ['', Validators.required],
      edad: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      comuna: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {}

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')!.value === formGroup.get('confirmPassword')!.value
      ? null : { mismatch: true };
  }

  async register() {
    if (this.registerForm.valid) {
      const nuevoUsuario = {
        id: uuidv4(),
        nombre: this.registerForm.get('nombre')!.value,
        apellidoPaterno: this.registerForm.get('apellidoPaterno')!.value,
        apellidoMaterno: this.registerForm.get('apellidoMaterno')!.value,
        email: this.registerForm.get('email')!.value,
        rut: this.registerForm.get('rut')!.value,
        edad: this.registerForm.get('edad')!.value,
        password: this.registerForm.get('password')!.value,
        comuna: this.registerForm.get('comuna')!.value,
        posicion: '',
        foto: ''
      };

      await this.usuariosService.addUsuario(nuevoUsuario);
      const alert = await this.alertController.create({
        header: 'Registro Exitoso',
        message: 'Usuario registrado correctamente',
        buttons: ['OK']
      });
      await alert.present();
      this.navCtrl.navigateRoot('/login');
    }
  }
}
