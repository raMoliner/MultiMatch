import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlmacenamientoService } from '../../servicios/almacenamiento.service';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent {
  constructor(
    private almacenamientoService: AlmacenamientoService,
    private router: Router
  ) {
    this.logout();
  }

  async logout() {
    await this.almacenamientoService.set('isLoggedIn', false);
    await this.almacenamientoService.set('currentUser', null);
    this.router.navigateByUrl('/login');
  }
}
