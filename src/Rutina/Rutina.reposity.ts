import { InjectRepository } from '@nestjs/typeorm';
import { Rutina } from './Rutina.entity';
import { ILike, In, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Category } from 'src/Category/Category.entity';
import { CreateRutinaDto } from './Rutinas.Dto';
import { Users } from 'src/User/User.entity';
import { Ejercicio } from 'src/Ejercicios/Ejercicios.entity';

@Injectable()
export class RutinaRepository {
  constructor(
    @InjectRepository(Rutina)
    private readonly rutinaRepository: Repository<Rutina>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(Ejercicio)
    private exerciceRepository: Repository<Ejercicio>,
  ) {}
  async getAllRutinas(
    page: number,
    limit: number,
    category?: string,
    location?: string,
    difficultyLevel?: string,
    search?: string,
  ) {
    let whereConditions: any = { isActive: true, check: true };

    if (category) {
      const categoria = await this.categoryRepository.findOne({
        where: { id: category },
      });
      whereConditions.category = categoria;
    }

    if (location) {
      whereConditions.location = location;
    }

    if (difficultyLevel) {
      whereConditions.difficultyLevel = difficultyLevel;
    }
    if (search) {
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
    return await this.rutinaRepository.find({
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
  async createRutina(rutina: CreateRutinaDto, userId: string) {
    const admin = await this.userRepository.findOne({ where: { id: userId } });
    if (!admin) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const category = await this.categoryRepository.find({
      where: { id: In(rutina.category) },
    });
    if (!category.length) {
      throw new BadRequestException('Categoria no encontrada');
    }

    const exercise = await this.exerciceRepository.find({
      where: { id: In(rutina.exercise), user: { id: userId } },
      relations: ['user'],
    });

    if (!exercise.length) {
      throw new BadRequestException('Ejercicio no encontrado');
    }
    return await this.rutinaRepository.save({
      ...rutina,
      admin,
      category,
      exercise,
    }); //Este metodo cambie por create
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
