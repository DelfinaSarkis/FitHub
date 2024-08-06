/* eslint-disable @typescript-eslint/no-unused-vars */
import { Category } from 'src/Category/Category.entity';
import { PlanRepository } from './Plan.repository';
import { DifficultyLevel } from './difficultyLevel.enum';
import { Inject, Injectable } from '@nestjs/common';
import { PlanCreateDto, PlanUpdateDto } from './CreatePlan.dto';
import { log } from 'console';
import { Users } from 'src/User/User.entity';
import { FilesUploadService } from 'src/files-upload/files-upload.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from './Plan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlanService {
  constructor(
    private readonly planRepository: PlanRepository,
    private readonly filesUploadService: FilesUploadService,
    @InjectRepository(Plan)
    private readonly planesRepository: Repository<Plan>,
  ) {}
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

  // async createPlan(
  //   plan: PlanCreateDto,
  //   admin: string,
  //   files: Express.Multer.File[],
  //   resourceType: 'auto' | 'image' | 'video' = 'auto',
  // ) {
  //   console.log(admin);
  //   const newPlan = await this.planRepository.createPlan(plan, admin);
  //   if (files) {
  //     const filesUrls = await this.filesUploadService.uploadFiles(
  //       files,
  //       resourceType,
  //     );
  //     if (resourceType === 'image') {
  //       newPlan.imgUrl = filesUrls;
  //     } else if (resourceType === 'video') {
  //       newPlan.videoUrl = filesUrls;
  //     }
  //   }

  //   return await this.planesRepository.save(newPlan);
  // }

  async createPlan(plan: PlanCreateDto, admin: string) {
    console.log(admin);
    return await this.planRepository.createPlan(plan, admin);
  }

  async createSubscription(req, res) {
    return await this.planRepository.createOrderPlan(req, res);
  }

  async updatePlan(plan: PlanUpdateDto, identificacion: string, admin: string) {
    await this.planRepository.updatePlan(plan, admin, identificacion);
  }

  async deletePlan(id: string, user) {
    return await this.planRepository.deletePlan(id, user);
  }
}
