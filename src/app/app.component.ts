import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { AlmacenamientoService } from './servicios/almacenamiento.service';
import { ChangeDetectorRef } from '@angular/core';
import { loadTestData } from './servicios/test-data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  isClubUser = false;
  isPlayerUser = false;

  constructor(
    private router: Router,
    private platform: Platform,
    private almacenamientoService: AlmacenamientoService,
    private cd: ChangeDetectorRef
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();
    if (this.platform.is('capacitor')) {
      await StatusBar.setStyle({ style: Style.Default });
      await SplashScreen.hide();
    }
    await this.almacenamientoService.init();
    await this.checkLoginStatus();
    await loadTestData(this.almacenamientoService);  // Load test data
  }

  async ngOnInit() {
    await this.checkLoginStatus();
  }

  async checkLoginStatus() {
    const loggedIn = await this.almacenamientoService.get('isLoggedIn');
    this.isLoggedIn = !!loggedIn;

    if (this.isLoggedIn) {
      const currentUser = await this.almacenamientoService.get('currentUser');
      if (currentUser && typeof currentUser === 'object' && 'tipoUsuario' in currentUser) {
        this.isClubUser = currentUser.tipoUsuario === 'club';
        this.isPlayerUser = currentUser.tipoUsuario === 'jugador';
      }
    }

    this.cd.detectChanges();
  }

  async logout() {
    await this.almacenamientoService.set('isLoggedIn', false);
    await this.almacenamientoService.set('currentUser', null);
    this.isLoggedIn = false;
    this.router.navigateByUrl('/login');
    this.cd.detectChanges();
  }

  navigateToHome() {
    this.router.navigateByUrl('/home');
  }

  navigateToProfile() {
    this.router.navigateByUrl('/perfil');
  }

  async clearStorage() {
    await this.almacenamientoService.clear();
    console.log('Storage cleared');
  }
}