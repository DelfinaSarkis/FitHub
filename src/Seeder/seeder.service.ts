/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/Auth/Auth.Sevice';
import { EjercicioDto } from 'src/Ejercicios/CreateEjercicio.dto';
import { EjercicioService } from 'src/Ejercicios/Ejercicios.service';
import { CreateUserDto } from 'src/User/CreateUser.Dto';

const ejercicios: EjercicioDto[] = [
  {
    titulo: 'Triceps',
    descripcion: 'Estos ejercicios se basan en trabajar los triceps',
    imgUrl: ['https://example.com/triceps.png'],
  },
  {
    titulo: 'Biceps',
    descripcion: 'Estos ejercicios se basan en trabajar los biceps',
    imgUrl: ['https://example.com/triceps.png'],
  },
  {
    titulo: 'Sentadillas',
    descripcion:
      'Estos ejercicios se centran en fortalecer los músculos de las piernas y glúteos',
    imgUrl: ['https://example.com/triceps.png'],
  },
  {
    titulo: 'Press de banca',
    descripcion:
      'Estos ejercicios están diseñados para trabajar el pecho y los tríceps',
    imgUrl: ['https://example.com/triceps.png'],
  },
  {
    titulo: 'Peso muerto',
    descripcion:
      'Estos ejercicios son fundamentales para el desarrollo de la fuerza en la parte inferior del cuerpo',
    imgUrl: ['https://example.com/triceps.png'],
  },
  {
    titulo: 'Dominadas',
    descripcion:
      'Estos ejercicios están enfocados en fortalecer los músculos de la espalda y los bíceps',
    imgUrl: ['https://example.com/triceps.png'],
  },
  {
    titulo: 'Burpees',
    descripcion:
      'Estos ejercicios combinan trabajo de fuerza y cardio para un entrenamiento completo',
    imgUrl: ['https://example.com/triceps.png'],
  },
  {
    titulo: 'Flexiones',
    descripcion: 'Estos ejercicios trabajan el pecho, tríceps y hombros',
    imgUrl: ['https://example.com/triceps.png'],
  },
  {
    titulo: 'Zancadas',
    descripcion:
      'Estos ejercicios ayudan a fortalecer y tonificar las piernas y glúteos',
    imgUrl: ['https://example.com/triceps.png'],
  },
  {
    titulo: 'Saltos de caja',
    descripcion:
      'Estos ejercicios mejoran la explosividad y la fuerza de las piernas',
    imgUrl: ['https://example.com/triceps.png'],
  },
  {
    titulo: 'Kettlebell Swings',
    descripcion:
      'Estos ejercicios son excelentes para trabajar la cadera y la parte posterior del cuerpo',
    imgUrl: ['https://example.com/triceps.png'],
  },
  {
    titulo: 'Clean and Jerk',
    descripcion:
      'Estos ejercicios son movimientos olímpicos que trabajan todo el cuerpo',
    imgUrl: ['https://example.com/triceps.png'],
  },
  {
    titulo: 'Snatch',
    descripcion:
      'Estos ejercicios son movimientos olímpicos que mejoran la fuerza y la potencia',
    imgUrl: ['https://example.com/triceps.png'],
  },
  {
    titulo: 'Mountain Climbers',
    descripcion:
      'Estos ejercicios combinan cardio y fuerza, trabajando el núcleo y las piernas',
    imgUrl: ['https://example.com/triceps.png'],
  },
  {
    titulo: 'Remos con barra',
    descripcion:
      'Estos ejercicios están enfocados en trabajar los músculos de la espalda',
    imgUrl: ['https://example.com/triceps.png'],
  },
  {
    titulo: 'Box Jumps',
    descripcion:
      'Estos ejercicios mejoran la fuerza explosiva y la coordinación',
    imgUrl: ['https://example.com/triceps.png'],
  },
  {
    titulo: 'Battle Ropes',
    descripcion:
      'Estos ejercicios son excelentes para el acondicionamiento cardiovascular y la fuerza de la parte superior del cuerpo',
    imgUrl: ['https://example.com/triceps.png'],
  },
  {
    titulo: 'Russian Twists',
    descripcion:
      'Estos ejercicios están diseñados para trabajar los oblicuos y el núcleo',
    imgUrl: ['https://example.com/triceps.png'],
  },
  {
    titulo: 'Pull-ups',
    descripcion:
      'Estos ejercicios son esenciales para el desarrollo de la fuerza en la parte superior del cuerpo',
    imgUrl: ['https://example.com/triceps.png'],
  },
  {
    titulo: 'Overhead Squats',
    descripcion:
      'Estos ejercicios combinan fuerza y estabilidad, trabajando principalmente las piernas y los hombros',
    imgUrl: ['https://example.com/triceps.png'],
  },
];

const entrenadores: CreateUserDto[] = [
  {
    name: 'Marco Antonio',
    email: 'mailentrenador1@mail.com',
    dni: 10000000,
    password: '12345678aA!',
    passwordConfirm: '12345678aA!',
    phone: 2664404040,
    country: 'Argentina',
    address: 'Calle Falsa 123',
    city: 'Mendoza',
  },
  {
    name: 'Marco Aurelio',
    email: 'mailentrenador2@mail.com',
    dni: 20000000,
    password: '12345678aA!',
    passwordConfirm: '12345678aA!',
    phone: 2664404040,
    country: 'Argentina',
    address: 'Calle Falsa 123',
    city: 'Mendoza',
  },
];

const usuarios: CreateUserDto[] = [
  {
    name: 'Lucía Fernández',
    email: 'lucia.fernandez@mail.com',
    dni: 25000000,
    password: 'Password123!',
    passwordConfirm: 'Password123!',
    phone: 2664455566,
    country: 'Argentina',
    address: 'Avenida Siempreviva 742',
    city: 'Buenos Aires',
  },
  {
    name: 'Joaquín Pérez',
    email: 'joaquin.perez@mail.com',
    dni: 30000000,
    password: 'SecurePass99!',
    passwordConfirm: 'SecurePass99!',
    phone: 2664411122,
    country: 'Argentina',
    address: 'Calle Mayor 456',
    city: 'Córdoba',
  },
  {
    name: 'Valentina López',
    email: 'valentina.lopez@mail.com',
    dni: 35000000,
    password: 'MyPassword1!',
    passwordConfirm: 'MyPassword1!',
    phone: 2664422233,
    country: 'Argentina',
    address: 'Boulevard Central 789',
    city: 'Rosario',
  },
  {
    name: 'Santiago Gómez',
    email: 'santiago.gomez@mail.com',
    dni: 40000000,
    password: 'StrongPass77!',
    passwordConfirm: 'StrongPass77!',
    phone: 2664433344,
    country: 'Argentina',
    address: 'Camino Real 101',
    city: 'La Plata',
  },
];

@Injectable()
export class SeederService {
  constructor(
    private readonly ejerciciosService: EjercicioService,
    private readonly authService: AuthService,
  ) {}
  async addSeeders() {
    ejercicios.map(async (ejercicio) => {
      await this.ejerciciosService.createEjercicio(ejercicio);
    });

    entrenadores.map(async (entrenador) => {
      await this.authService.signupEntrenador(entrenador);
    });

    usuarios.map(async (usuario) => {
      await this.authService.signup(usuario);
    });
    return 'Ejercicios, usuarios y entrenadores creados';
  }
}
