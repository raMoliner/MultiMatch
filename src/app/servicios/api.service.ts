import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlmacenamientoService } from './almacenamiento.service';
import { Usuario, Equipo, Reserva, Partido } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.ejemplo.com';

  constructor(private http: HttpClient, private almacenamientoService: AlmacenamientoService) {}

  obtenerPerfilUsuario(userId: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuarios/${userId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return this.almacenamientoService.get(`perfilUsuario-${userId}`);
        } else {
          return throwError(error);
        }
      })
    );
  }

  actualizarPerfilUsuario(data: Usuario): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/usuarios/${data.id}`, data);
  }

  obtenerEquipos(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${this.apiUrl}/equipos`);
  }

  obtenerReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/reservas`);
  }

  obtenerPartidos(): Observable<Partido[]> {
    return this.http.get<Partido[]>(`${this.apiUrl}/partidos`);
  }

  // Otras funciones para manejar las peticiones API
}
