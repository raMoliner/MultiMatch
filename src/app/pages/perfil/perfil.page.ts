import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ApiService } from 'src/app/servicios/api.service';
import { Usuario } from 'src/app/models/models';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  perfilUsuario: Usuario = {} as Usuario; // Inicializar perfilUsuario
  perfilForm: FormGroup; // Inicializar perfilForm

  constructor(
    private fb: FormBuilder,
    private camera: Camera,
    private apiService: ApiService
  ) {
    this.perfilForm = this.fb.group({ // Inicializar perfilForm en el constructor
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rut: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(1)]],
      posicion: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cargarPerfilUsuario();
  }

  cargarPerfilUsuario() {
    this.apiService.obtenerPerfilUsuario('userId').subscribe(data => {
      this.perfilUsuario = data;
      this.perfilForm.patchValue(this.perfilUsuario);
    });
  }

  tomarFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.perfilUsuario.foto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log('Error: ', err);
    });
  }

  actualizarPerfil() {
    if (this.perfilForm.valid) {
      const perfilActualizado = {
        ...this.perfilUsuario,
        ...this.perfilForm.value,
      };

      this.apiService.actualizarPerfilUsuario(perfilActualizado).subscribe(() => {
        console.log('Perfil actualizado');
      });
    }
  }
}
