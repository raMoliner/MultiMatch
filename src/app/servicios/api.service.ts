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

  // Métodos de autenticación
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      catchError(this.handleError)
    );
  }

  register(user: Usuario): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user).pipe(
      catchError(this.handleError)
    );
  }

  // Métodos para obtener datos
  obtenerPerfilUsuario(userId: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuarios/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  actualizarPerfilUsuario(data: Usuario): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/usuarios/${data.id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  obtenerEquipos(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${this.apiUrl}/equipos`).pipe(
      catchError(this.handleError)
    );
  }

  obtenerReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/reservas`).pipe(
      catchError(this.handleError)
    );
  }

  obtenerPartidos(): Observable<Partido[]> {
    return this.http.get<Partido[]>(`${this.apiUrl}/partidos`).pipe(
      catchError(this.handleError)
    );
  }

  obtenerJugadoresSinEquipo(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/jugadores-sin-equipo`).pipe(
      catchError(this.handleError)
    );
  }

  obtenerEquiposBuscandoContrincante(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${this.apiUrl}/equipos-buscando-contrincante`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError('Something went wrong; please try again later.');
  }
}
