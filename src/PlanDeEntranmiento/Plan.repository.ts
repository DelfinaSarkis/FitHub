/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from './Plan.entity';
import { Check, ILike, Repository } from 'typeorm';
import { Category } from 'src/Category/Category.entity';
import { DifficultyLevel } from './difficultyLevel.enum';
import { PlanCreateDto } from './CreatePlan.dto';
import { Users } from 'src/User/User.entity';

@Injectable()
export class PlanRepository {
  constructor(
    @InjectRepository(Plan) private planRepository: Repository<Plan>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async getPlan(
    page: number,
    limit: number,
    category?: string,
    location?: string,
    difficultyLevel?: DifficultyLevel,
    search?: string,
  ) {
    let whereConditions: any = { isActive: true, check: true };
    if (category !== undefined) {
      whereConditions.category = category;
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
    return this.planRepository.find({
      where: whereConditions,
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getPlanById(id) {
    return await this.planRepository.findOne({ where: { id, isActive: true } });
  }

  async createPlan(plan: PlanCreateDto, admin: string) {
    const adm = await this.userRepository.findOne({ where: { id: admin } });
    if (!adm) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const planCreado = await this.planRepository.create(plan);
    planCreado.admin = adm;
    await this.planRepository.save(planCreado);
    return 'Plan creado';
  }

  async updatePlan(plan, identificacion, admin) {
    const userAdmin = await this.userRepository.findOne({
      where: { id: admin },
    });
    const planToUpdate = await this.planRepository.findOne({
      where: { id: identificacion, admin: userAdmin },
    });
    if (!planToUpdate || planToUpdate.isActive === false) {
      throw new NotFoundException('Plan no encontrado o eliminado');
    }
    return await this.planRepository.update(identificacion, plan);
  }

  async deletePlan(id) {
    const plan = await this.planRepository.findOne({ where: { id: id } });
    if (!plan || plan.isActive === false) {
      throw new NotFoundException('Plan no encontrado o eliminado');
    }
    await this.planRepository.update(id, { ...plan, isActive: false });

    return id;
  }
}
