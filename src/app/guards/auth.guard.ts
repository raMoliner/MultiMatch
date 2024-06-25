import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlmacenamientoService } from '../servicios/almacenamiento.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private almacenamientoService: AlmacenamientoService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLoginStatus();
  }

  private async checkLoginStatus(): Promise<boolean | UrlTree> {
    try {
      const isLoggedIn = await this.almacenamientoService.get<boolean>('isLoggedIn');
      if (isLoggedIn) {
        return true;
      } else {
        return this.router.parseUrl('/login');
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      return this.router.parseUrl('/login');
    }
  }
}
