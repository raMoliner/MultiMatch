import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private almacenamientoService: AlmacenamientoService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.apiService.login(email, password).subscribe(
        async success => {
          // Establecer isLoggedIn en true
          await this.almacenamientoService.set('isLoggedIn', true);
          // Redirigir a la página principal
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Login failed', error);
        }
      );
    }
  }
}
