import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private alertController: AlertController) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }

  private async handleError(error: HttpErrorResponse): Promise<void> {
    console.error('API error:', error);

    const alert = await this.alertController.create({
      header: 'API Error',
      message: error.message || 'Error inesperado.',
      buttons: ['OK']
    });

    await alert.present();
  }
}