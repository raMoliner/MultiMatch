import { AlmacenamientoService } from './almacenamiento.service';
import { Usuario, Equipo, Club, Cancha } from '../models/models';
import { v4 as uuidv4 } from 'uuid';

const firstNames = ['Juan', 'Pedro', 'Carlos', 'José', 'Luis', 'Miguel', 'Francisco', 'David', 'Jorge', 'Ricardo'];
const lastNames = ['González', 'Rodríguez', 'Pérez', 'López', 'Sánchez', 'Ramírez', 'Cruz', 'Martínez', 'Torres', 'Gómez'];

export async function loadTestData(almacenamientoService: AlmacenamientoService) {
  const generateJugadores = (count: number): Usuario[] => {
    const positions = ['Portero', 'Defensor', 'Mediocampista', 'Delantero'];
    const usuarios: Usuario[] = [];
    for (let i = 1; i <= count; i++) {
      const nombre = firstNames[Math.floor(Math.random() * firstNames.length)];
      const apellidoPaterno = lastNames[Math.floor(Math.random() * lastNames.length)];
      const apellidoMaterno = lastNames[Math.floor(Math.random() * lastNames.length)];

      usuarios.push({
        id: uuidv4(),
        nombre: nombre,
        apellidoPaterno: apellidoPaterno,
        apellidoMaterno: apellidoMaterno,
        email: `${nombre.toLowerCase()}.${apellidoPaterno.toLowerCase()}@example.com`,
        rut: `${Math.floor(Math.random() * 10000000)}-${Math.floor(Math.random() * 9)}`,
        edad: 18 + Math.floor(Math.random() * 23),
        posicion: positions[Math.floor(Math.random() * positions.length)],
        comuna: 'Santiago',
        foto: '',
        password: 'Password123!',
        tipoUsuario: 'jugador',
        buscandoEquipo: true
      });
    }
    return usuarios;
  };

  const jugadores = generateJugadores(50);

  const equipos: Equipo[] = [
    { id: uuidv4(), nombre: 'Los cola e flecha', miembros: jugadores.slice(0, 5).map(u => u.id), tamaño: 5 },
    { id: uuidv4(), nombre: 'Piscola F.C', miembros: jugadores.slice(5, 10).map(u => u.id), tamaño: 5 },
    { id: uuidv4(), nombre: 'Tus Vecinos F.C', miembros: jugadores.slice(10, 17).map(u => u.id), tamaño: 7 },
    { id: uuidv4(), nombre: 'Club Deportivo Higueras', miembros: jugadores.slice(17, 24).map(u => u.id), tamaño: 7 },
    { id: uuidv4(), nombre: 'Nones', miembros: jugadores.slice(24, 35).map(u => u.id), tamaño: 11 },
    { id: uuidv4(), nombre: '7 por 7', miembros: jugadores.slice(35, 46).map(u => u.id), tamaño: 11 }
  ];

  const canchas: Cancha[] = [
    { id: uuidv4(), clubId: '1', nombre: 'Cancha 1', tipo: 'Fútbol 5', bloqueada: false, tamaño: 5 },
    { id: uuidv4(), clubId: '1', nombre: 'Cancha 2', tipo: 'Fútbol 7', bloqueada: false, tamaño: 7 },
    { id: uuidv4(), clubId: '2', nombre: 'Cancha 3', tipo: 'Fútbol 11', bloqueada: false, tamaño: 11 },
    { id: uuidv4(), clubId: '2', nombre: 'Cancha 4', tipo: 'Fútbol 5', bloqueada: false, tamaño: 5 },
    { id: uuidv4(), clubId: '3', nombre: 'Cancha 5', tipo: 'Fútbol 7', bloqueada: false, tamaño: 7 },
    { id: uuidv4(), clubId: '3', nombre: 'Cancha 6', tipo: 'Fútbol 11', bloqueada: false, tamaño: 11 }
  ];

  const clubes: Club[] = [
    { id: '1', nombre: 'Club Deportivo El Jacinto', rut: '20.123.456-7', direccion: 'Dirección 1', comuna: 'Santiago', canchas: canchas.filter(c => c.clubId === '1') },
    { id: '2', nombre: 'Escuela de Fútbol de Paredones', rut: '21.123.456-8', direccion: 'Dirección 2', comuna: 'Las Condes', canchas: canchas.filter(c => c.clubId === '2') },
    { id: '3', nombre: 'El Caporal F.C', rut: '22.123.456-9', direccion: 'Dirección 3', comuna: 'Providencia', canchas: canchas.filter(c => c.clubId === '3') }
  ];

  await almacenamientoService.set('usuarios', jugadores);
  await almacenamientoService.set('equipos', equipos);
  await almacenamientoService.set('clubs', clubes);
  await almacenamientoService.set('canchas', canchas);
}
