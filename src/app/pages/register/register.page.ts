import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { Usuario } from 'src/app/models/models';
import { REGIONES_COMUNAS } from 'src/app/models/regiones-comunas'; // Importamos el archivo de regiones y comunas

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  regionesComunas = REGIONES_COMUNAS;
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
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rut: ['', Validators.required],
      edad: ['', Validators.required],
      region: ['', Validators.required],
      comuna: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      posicion: ['', Validators.required],
      foto: [''],
      buscandoEquipo: [false]
    });

    this.registerForm.get('region')?.valueChanges.subscribe((region) => {
      this.onRegionChange(region);
    });
  }

  ngOnInit() {}

  onRegionChange(region: string) {
    const regionObj = this.regionesComunas.find((reg) => reg.region === region);
    this.comunas = regionObj ? regionObj.comunas : [];
    this.registerForm.get('comuna')?.setValue('');
  }

  async onSubmit() {
    const loading = await this.loadingController.create({
      message: 'Registrando...',
    });
    await loading.present();

    const formValues = this.registerForm.value;

    const nuevoUsuario: Usuario = {
      id: this.almacenamientoService.generateId(),
      tipoUsuario: formValues.tipoUsuario,
      nombre: formValues.nombre,
      apellidoPaterno: formValues.apellidoPaterno,
      apellidoMaterno: formValues.apellidoMaterno,
      email: formValues.email,
      rut: formValues.rut,
      edad: formValues.edad,
      comuna: formValues.comuna,
      password: formValues.password,
      posicion: formValues.posicion,
      foto: formValues.foto || '',
      buscandoEquipo: formValues.buscandoEquipo
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
