import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlmacenamientoService } from './servicios/almacenamiento.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private almacenamientoService: AlmacenamientoService,
    private cd: ChangeDetectorRef
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.almacenamientoService.init().then(() => {
        this.checkLoginStatus();
      });
    });
  }

  async ngOnInit() {
    await this.checkLoginStatus();
  }

  async checkLoginStatus() {
    const loggedIn = await this.almacenamientoService.get('isLoggedIn');
    this.isLoggedIn = !!loggedIn; 
    this.cd.detectChanges(); 
  }

  async logout() {
    await this.almacenamientoService.set('isLoggedIn', false);
    await this.almacenamientoService.set('currentUser', null);
    this.isLoggedIn = false;
    this.router.navigateByUrl('/login');
    this.cd.detectChanges(); // 
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
