import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { Usuario } from 'src/app/models/models';
import { regionesComunas } from 'src/app/models/regiones-comunas';
import { CameraService } from 'src/app/servicios/camera.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  regiones: string[] = [];
  comunas: string[] = [];
  foto: SafeResourceUrl | null = null;
  posiciones = ['Delantero', 'Mediocampista', 'Defensa', 'Portero'];

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private almacenamientoService: AlmacenamientoService,
    private cameraService: CameraService,
    private sanitizer: DomSanitizer
  ) {
    this.registerForm = this.formBuilder.group({
      tipoUsuario: ['jugador', Validators.required],
      rut: ['', [Validators.required, Validators.pattern(/^\d{7,8}-[\dkK]$/)]],
      region: ['', Validators.required],
      comuna: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z]+$/)]],
      direccion: [''],
      apellidoPaterno: ['', [Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z]+$/)]],
      apellidoMaterno: ['', [Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.min(18)]],
      posicion: [''],
      foto: [''],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword: ['', Validators.required],
      buscandoEquipo: [false]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.regiones = this.loadRegiones();
    this.onTipoUsuarioChange();
  }

  loadRegiones(): string[] {
    return regionesComunas.map(region => region.region);
  }

  onRegionChange() {
    const regionSeleccionada = this.registerForm.get('region')?.value;
    const region = regionesComunas.find(r => r.region === regionSeleccionada);
    this.comunas = region ? region.comunas : [];
    this.registerForm.patchValue({ comuna: '' });
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
      buscandoEquipo: formValues.buscandoEquipo || false,
      direccion: formValues.direccion || ''
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

  async takePhoto() {
    try {
      const photo = await this.cameraService.takePicture();
      this.foto = this.sanitizer.bypassSecurityTrustResourceUrl(photo);
      this.registerForm.patchValue({ foto: photo });
    } catch (error) {
      this.showErrorAlert('Error', (error as Error).message);
    }
  }

  async selectPhoto() {
    try {
      const photo = await this.cameraService.selectPicture();
      this.foto = this.sanitizer.bypassSecurityTrustResourceUrl(photo);
      this.registerForm.patchValue({ foto: photo });
    } catch (error) {
      this.showErrorAlert('Error', (error as Error).message);
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

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ mismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  onTipoUsuarioChange() {
    const tipoUsuario = this.registerForm.get('tipoUsuario')?.value;
    if (tipoUsuario === 'club') {
      this.registerForm.get('nombre')?.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z]+$/)]);
      this.registerForm.get('apellidoPaterno')?.clearValidators();
      this.registerForm.get('apellidoMaterno')?.clearValidators();
      this.registerForm.get('edad')?.clearValidators();
      this.registerForm.get('posicion')?.clearValidators();
      this.registerForm.get('buscandoEquipo')?.clearValidators();
      this.registerForm.get('direccion')?.setValidators([Validators.required]);
    } else {
      this.registerForm.get('nombre')?.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z]+$/)]);
      this.registerForm.get('apellidoPaterno')?.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z]+$/)]);
      this.registerForm.get('apellidoMaterno')?.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z]+$/)]);
      this.registerForm.get('edad')?.setValidators([Validators.required, Validators.min(18)]);
      this.registerForm.get('posicion')?.setValidators([]);
      this.registerForm.get('buscandoEquipo')?.setValidators([]);
      this.registerForm.get('direccion')?.clearValidators();
    }
    this.registerForm.get('nombre')?.updateValueAndValidity();
    this.registerForm.get('apellidoPaterno')?.updateValueAndValidity();
    this.registerForm.get('apellidoMaterno')?.updateValueAndValidity();
    this.registerForm.get('edad')?.updateValueAndValidity();
    this.registerForm.get('posicion')?.updateValueAndValidity();
    this.registerForm.get('buscandoEquipo')?.updateValueAndValidity();
    this.registerForm.get('direccion')?.updateValueAndValidity();
  }
}
