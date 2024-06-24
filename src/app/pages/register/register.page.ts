import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { AlertController, NavController } from '@ionic/angular';
import { CameraService } from 'src/app/servicios/camera.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  photo: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private alertController: AlertController,
    private navCtrl: NavController,
    private cameraService: CameraService
  ) {
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellidoPaterno: ['', [Validators.required]],
      apellidoMaterno: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      rut: ['', [Validators.required]],
      edad: ['', [Validators.required, Validators.min(18)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    }, {validator: this.passwordMatchValidator});
  }

  ngOnInit() {}

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value 
      ? null : {'mismatch': true};
  }

  async onRegister() {
    if (this.registerForm.valid) {
      const { nombre, apellidoPaterno, apellidoMaterno, email, rut, edad, password } = this.registerForm.value;
      const nuevoUsuario = {
        id: uuidv4(),
        nombre: this.capitalizeFirstLetter(nombre),
        apellidoPaterno: this.capitalizeFirstLetter(apellidoPaterno),
        apellidoMaterno: this.capitalizeFirstLetter(apellidoMaterno),
        email,
        rut,
        edad,
        password,
        posicion: '', // agregar posición aquí si es necesario
        foto: this.photo || 'assets/default-avatar.png'
      };

      try {
        await this.usuariosService.addUsuario(nuevoUsuario);
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Registro exitoso.',
          buttons: ['OK']
        });
        await alert.present();
        this.navCtrl.navigateRoot('/login');
      } catch (error) {
        const alert = await this.alertController.create({
          header: 'Error',
          message: (error as Error).message,
          buttons: ['OK']
        });
        await alert.present();
      }
    }
  }

  async takePicture() {
    try {
      this.photo = await this.cameraService.takePicture();
    } catch (err) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo tomar la foto: ' + err,
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  irARegistro() {
    this.navCtrl.navigateForward('/login');
  }
}
