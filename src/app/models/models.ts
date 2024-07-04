export interface Usuario {
  id: string;
  nombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  email?: string;
  rut: string;
  edad?: number;
  posicion?: string;
  comuna: string;
  foto?: string;
  password?: string;
  tipoUsuario: string;
  buscandoEquipo?: boolean;
  equipo?: string;
}


export interface Equipo {
  id: string;
  nombre: string;
  lugar?: string;
  miembros: string[];
}

export interface Reserva {
  id: string;
  fecha: string;
  hora: string;
  equipo: Equipo;
  cancha: Cancha;
}

export interface Partido {
  id: string;
  equipo1: Equipo;
  equipo2: Equipo;
  fecha: string;
  hora: string;
  lugar: string;
  cancha?: Cancha;
}

export interface Club {
  id: string;
  nombre: string;
  rut: string;
  direccion: string;
  comuna: string;
  canchas: Cancha[];
}

export interface Cancha {
  id: string;
  clubId: string;
  nombre: string;
  tipo: string;
  bloqueada: boolean;
}

export interface Invitacion {
  id: string;
  equipoId: string;
  jugadorId: string;
  equipoNombre: string; // Añadir esta propiedad si no existe
  mensaje: string;
  estado: 'pendiente' | 'aceptada' | 'rechazada';
}