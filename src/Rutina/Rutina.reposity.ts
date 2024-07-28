import { InjectRepository } from '@nestjs/typeorm';
import { Rutina } from './Rutina.entity';
import { ILike, In, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class RutinaRepository {
  constructor(
    @InjectRepository(Rutina)
    private readonly rutinaRepository: Repository<Rutina>,
  ) {}
  async getAllRutinas(
    page: number,
    limit: number,
    category?: string[],
    location?: string,
    difficultyLevel?: string,
    search?: string,
  ) {
    console.log('hoal2');
    let whereConditions: any = { isActive: true, check: true };
    if (category !== undefined) {
      whereConditions.categoria = In(category);
    }

    if (location !== undefined) {
      whereConditions.location = location;
    }

    if (difficultyLevel !== undefined) {
      whereConditions.difficultyLevel = difficultyLevel;
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
    console.log(whereConditions);
    return this.rutinaRepository.find({
      where: whereConditions,
      skip: (page - 1) * limit,
      take: limit,
    });
  }
  async getRutinaById(id) {
    return await this.rutinaRepository.findOne({
      where: { id, isActive: true },
    });
  }
  async createRutina(rutina) {
    await this.rutinaRepository.save(rutina);
    return 'Rutina creada';
  }
  async updateRutina(rutina, id) {
    const existingRoutine = await this.rutinaRepository.findOneBy({ id });
    if (!existingRoutine) {
      throw new Error('Rutina no encontrada');
    }
    await this.rutinaRepository.update(id, rutina);
    const updateRutina = await this.rutinaRepository.findOneBy({ id });
    return updateRutina;
  }
  async deleteRutina(id) {
    const rutina = await this.rutinaRepository.findOne({ where: { id } });
    if (!rutina || rutina.isActive === false) {
      throw new BadRequestException('Rutina no encontrada o eliminada');
    }
    await this.rutinaRepository.remove(rutina);
    return 'Rutina eliminada';
  }
}
