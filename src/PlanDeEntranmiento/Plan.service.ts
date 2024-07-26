/* eslint-disable @typescript-eslint/no-unused-vars */
import { Category } from 'src/Category/Category.entity';
import { PlanRepository } from './Plan.repository';
import { DifficultyLevel } from './difficultyLevel.enum';
import { Inject, Injectable } from '@nestjs/common';
import { PlanCreateDto, PlanUpdateDto } from './CreatePlan.dto';
import { log } from 'console';

@Injectable()
export class PlanService {
  constructor(private readonly planRepository: PlanRepository) {}
  async getPlan(
    page: string,
    limit: string,
    category?: string,
    location?: string,
    difficultyLevel?: DifficultyLevel,
    search?: string,
  ) {
    return this.planRepository.getPlan(
      Number(page),
      Number(limit),
      category,
      location,
      difficultyLevel,
      search,
    );
  }

  async getPlanById(id) {
    return await this.planRepository.getPlanById(id);
  }

  async createPlan(plan: PlanCreateDto, admin: string) {
    return await this.planRepository.createPlan(plan, admin);
  }

  async updatePlan(plan: PlanUpdateDto, identificacion: string, admin: string) {
    await this.planRepository.updatePlan(plan, admin, identificacion);
  }

  async deletePlan(id) {
    return await this.planRepository.deletePlan(id);
  }
}
