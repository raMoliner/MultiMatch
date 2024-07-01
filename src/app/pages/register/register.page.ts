import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { Usuario, Club } from 'src/app/models/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  photo: string = '';

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private almacenamientoService: AlmacenamientoService,
    private loadingController: LoadingController
  ) {
    this.registerForm = this.fb.group({
      tipoUsuario: ['jugador', Validators.required],
      nombre: [''],
      apellidoPaterno: [''],
      apellidoMaterno: [''],
      email: [''],
      rut: [''],
      edad: [''],
      comuna: [''],
      password: [''],
      confirmPassword: [''],
      posicion: [''],
      buscandoEquipo: [false],
      nombreClub: [''],
      rutClub: [''],
      direccionClub: [''],
      comunaClub: ['']
    });
  }

  ngOnInit() {}

  async onSubmit() {
    const loading = await this.loadingController.create({
      message: 'Registrando...',
    });
    await loading.present();

    const formValues = this.registerForm.value;
    const tipoUsuario = formValues.tipoUsuario;

    if (tipoUsuario === 'jugador') {
      const nuevoUsuario: Usuario = {
        id: this.almacenamientoService.generateId(),
        nombre: formValues.nombre,
        apellidoPaterno: formValues.apellidoPaterno,
        apellidoMaterno: formValues.apellidoMaterno,
        email: formValues.email,
        rut: formValues.rut,
        edad: formValues.edad,
        comuna: formValues.comuna,
        password: formValues.password,
        posicion: formValues.posicion,
        foto: this.photo
      };

      await this.almacenamientoService.addUsuario(nuevoUsuario);
    } else if (tipoUsuario === 'club') {
      const nuevoClub: Club = {
        id: this.almacenamientoService.generateId(),
        nombre: formValues.nombreClub,
        rut: formValues.rutClub,
        direccion: formValues.direccionClub,
        comuna: formValues.comunaClub,
        canchas: []
      };

      await this.almacenamientoService.addClub(nuevoClub);
    }

    await loading.dismiss();
    this.navCtrl.navigateRoot('/login');
  }
}
