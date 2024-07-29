/* eslint-disable @typescript-eslint/no-unused-vars */
import { InjectRepository } from '@nestjs/typeorm';
import { Ejercicio } from './Ejercicios.entity';
import { CreateUserDto } from 'src/User/CreateUser.Dto';
import { EjercicioDto } from './CreateEjercicio.dto';
import { Users } from 'src/User/User.entity';
import { ILike, Repository } from 'typeorm';

export class EjercicioRepository {
  constructor(
    @InjectRepository(Ejercicio)
    private readonly ejercicioRepository: Repository<Ejercicio>,
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async getEjercicios(
    page: number,
    limit: number,
    titulo?: string,
    descripcion?: string,
    search?: string,
  ) {
    let whereConditions: any = {};
    if (titulo !== undefined) {
      whereConditions.titulo = ILike(`%${titulo}%`);
    }
    if (descripcion !== undefined) {
      whereConditions.descripcion = ILike(`%${descripcion}%`);
    }
    if (search !== undefined) {
      const stopWords = new Set(['de', 'y', 'el', 'la', 'en', 'a', 'o']); // Lista de palabras de parada
      const arrSearch = search
        .split(' ')
        .filter(
          (term) => term.trim() !== '' && !stopWords.has(term.toLowerCase()),
        );

      whereConditions = arrSearch.map((term) => ({
        ...whereConditions,
        titulo: ILike(`%${term}%`),
      }));
    }
    return await this.ejercicioRepository.find({
      where: whereConditions,
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getEjercicioById(id) {
    return await this.ejercicioRepository.findOne({ where: { id } });
  }

  async createEjercicio(ejercicio: EjercicioDto, userId: string) {
    const exercise = await this.ejercicioRepository.create(ejercicio);
    const usuarioAdmin = await this.userRepository.findOne({
      where: { id: userId },
    });

    exercise.user = usuarioAdmin;

    return await this.ejercicioRepository.save(exercise);
  }

  async updateEjercicio(ejercicio, id) {
    await this.ejercicioRepository.update(id, ejercicio);
    return 'El ejercicio se ha actualizado';
  }
}
