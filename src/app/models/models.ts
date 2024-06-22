export interface Usuario {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  email: string;
  rut: string;
  edad: number;
  posicion: string;
  foto?: string;
  password?: string;
}

export interface Equipo {
  id: string;
  nombre: string;
  lugar?: string;
  miembros: Usuario[];
}

export interface Reserva {
  id: string;
  fecha: string;
  hora: string;
  equipo: Equipo;
}

export interface Partido {
  id: string;
  equipo1: Equipo;
  equipo2: Equipo;
  fecha: string;
  hora: string;
  lugar: string;
}
