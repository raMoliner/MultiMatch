import { AlmacenamientoService } from './almacenamiento.service';
import { Usuario, Equipo, Club, Cancha } from '../models/models';
import { v4 as uuidv4 } from 'uuid';

export async function loadTestData(almacenamientoService: AlmacenamientoService) {
  const usuarios: Usuario[] = [
    { id: uuidv4(), nombre: 'Juan', apellidoPaterno: 'Perez', apellidoMaterno: 'Gomez', email: 'juan@example.com', rut: '12.345.678-9', edad: 25, posicion: 'Delantero', comuna: 'Santiago', foto: '', password: 'Password123!', tipoUsuario: 'jugador', buscandoEquipo: true },
    // Agrega más usuarios aquí...
  ];

  const equipos: Equipo[] = [
    { id: uuidv4(), nombre: 'Equipo 5-1', miembros: usuarios.slice(0, 5).map(u => u.id), tamaño: 5 },
    { id: uuidv4(), nombre: 'Equipo 5-2', miembros: usuarios.slice(5, 10).map(u => u.id), tamaño: 5 },
    { id: uuidv4(), nombre: 'Equipo 7-1', miembros: usuarios.slice(10, 17).map(u => u.id), tamaño: 7 },
    { id: uuidv4(), nombre: 'Equipo 7-2', miembros: usuarios.slice(17, 24).map(u => u.id), tamaño: 7 },
    { id: uuidv4(), nombre: 'Equipo 11-1', miembros: usuarios.slice(24, 35).map(u => u.id), tamaño: 11 },
    { id: uuidv4(), nombre: 'Equipo 11-2', miembros: usuarios.slice(35, 46).map(u => u.id), tamaño: 11 }
  ];

  const canchas: Cancha[] = [
    { id: uuidv4(), clubId: '1', nombre: 'Cancha 1', tipo: 'Fútbol 5', bloqueada: false, tamaño: 5 },
    { id: uuidv4(), clubId: '1', nombre: 'Cancha 2', tipo: 'Fútbol 7', bloqueada: false, tamaño: 7 },
    { id: uuidv4(), clubId: '2', nombre: 'Cancha 3', tipo: 'Fútbol 11', bloqueada: false, tamaño: 11 },
    // Agrega más canchas aquí...
  ];

  const clubes: Club[] = [
    { id: '1', nombre: 'Club 1', rut: '20.123.456-7', direccion: 'Dirección 1', comuna: 'Santiago', canchas: canchas.filter(c => c.clubId === '1') },
    { id: '2', nombre: 'Club 2', rut: '21.123.456-8', direccion: 'Dirección 2', comuna: 'Las Condes', canchas: canchas.filter(c => c.clubId === '2') }
  ];

  await almacenamientoService.set('usuarios', usuarios);
  await almacenamientoService.set('equipos', equipos);
  await almacenamientoService.set('clubs', clubes);
  await almacenamientoService.set('canchas', canchas);
}
