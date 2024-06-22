import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { Usuario } from 'src/app/models/models';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  perfilUsuario: Usuario | null = null;
  perfilForm: FormGroup;

  constructor(
    private almacenamientoService: AlmacenamientoService,
    private fb: FormBuilder
  ) {
    this.perfilForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rut: ['', Validators.required],
      edad: ['', Validators.required],
      posicion: ['', Validators.required],
      foto: ['']
    });
  }

  ngOnInit() {
    this.loadPerfil();
  }

  loadPerfil() {
    this.almacenamientoService.getUsuarios().subscribe(usuarios => {
      this.perfilUsuario = usuarios[0]; // Supongamos que el primer usuario es el perfil actual
      if (this.perfilUsuario) {
        this.perfilForm.patchValue(this.perfilUsuario);
      }
    });
  }

  actualizarPerfil() {
    if (this.perfilUsuario) {
      const updatedUsuario = { ...this.perfilUsuario, ...this.perfilForm.value };
      this.almacenamientoService.updateUsuario(updatedUsuario);
    }
  }

  tomarFoto() {
    console.log('Tomar foto');
  }
}
