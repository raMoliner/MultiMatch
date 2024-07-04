import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { Usuario } from 'src/app/models/models';
import { regionesComunas } from 'src/app/models/regiones-comunas';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  comunas: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private almacenamientoService: AlmacenamientoService
  ) {
    this.registerForm = this.formBuilder.group({
      tipoUsuario: ['jugador', Validators.required],
      rut: ['', [Validators.required, Validators.pattern(/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/)]],
      comuna: ['', Validators.required],
      nombre: ['', [Validators.minLength(3), Validators.maxLength(15), Validators.pattern(/^[a-zA-Z]+$/)]],
      apellidoPaterno: ['', [Validators.minLength(3), Validators.maxLength(15), Validators.pattern(/^[a-zA-Z]+$/)]],
      apellidoMaterno: ['', [Validators.minLength(3), Validators.maxLength(15), Validators.pattern(/^[a-zA-Z]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(18)]],
      posicion: [''],
      foto: [''],
      password: ['', [Validators.minLength(8), Validators.maxLength(15), Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/)]],
      buscandoEquipo: [false],
      direccion: ['']
    });
  }

  ngOnInit() {
    this.comunas = this.loadComunas();
  }

  loadComunas(): string[] {
    const comunasList: string[] = [];
    regionesComunas.forEach(region => {
      region.comunas.forEach(comuna => comunasList.push(comuna));
    });
    return comunasList;
  }

  async onSubmit() {
    if (this.registerForm.invalid) {
      this.showErrorAlert('Formulario inválido', 'Por favor, completa todos los campos correctamente.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Registrando...',
    });
    await loading.present();

    const formValues = this.registerForm.value;

    const nuevoUsuario: Usuario = {
      id: this.almacenamientoService.generateId(),
      tipoUsuario: formValues.tipoUsuario,
      rut: formValues.rut,
      comuna: formValues.comuna,
      nombre: formValues.nombre || '',
      apellidoPaterno: formValues.apellidoPaterno || '',
      apellidoMaterno: formValues.apellidoMaterno || '',
      email: formValues.email || '',
      edad: formValues.edad || 0,
      posicion: formValues.posicion || '',
      foto: formValues.foto || '',
      password: formValues.password || '',
      buscandoEquipo: formValues.buscandoEquipo || false
    };

    try {
      await this.almacenamientoService.addUsuario(nuevoUsuario);
      await this.almacenamientoService.set('currentUser', nuevoUsuario);
      this.navCtrl.navigateRoot('/home');
    } catch (error) {
      this.showErrorAlert('Error registrando', (error as Error).message);
    } finally {
      loading.dismiss();
    }
  }

  private async showErrorAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
