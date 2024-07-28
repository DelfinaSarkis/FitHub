/* eslint-disable @typescript-eslint/no-unused-vars */
import { InjectRepository } from '@nestjs/typeorm';
import { Ejercicio } from './Ejercicios.entity';
import { ILike, Repository } from 'typeorm';
import { EjercicioDto } from './CreateEjercicio.dto';

export class EjercicioRepository {
  constructor(
    @InjectRepository(Ejercicio)
    private readonly ejercicioRepository: Repository<Ejercicio>,
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
      whereConditions.titulo = titulo;
    }
    if (descripcion !== undefined) {
      whereConditions.descripcion = descripcion;
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
        name: ILike(`%${term}%`),
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

  async createEjercicio(ejercicio: EjercicioDto) {
    await this.ejercicioRepository.save(ejercicio);
    return ejercicio;
  }

  async updateEjercicio(ejercicio, id) {
    await this.ejercicioRepository.update(id, ejercicio);
    return 'El ejercicio se ha actualizado';
  }
}
