import { Category } from "src/Category/Category.entity";
import { PlanRepository } from "./Plan.repository";
import { DifficultyLevel } from "./difficultyLevel.enum";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class PlanService {
    constructor(private readonly planRepository:PlanRepository){}
    async getPlan(page: string, limit: string,category?:string,location?:string,difficultyLevel?:DifficultyLevel,search?:string){
        return this.planRepository.getPlan(Number(page), Number(limit),category, location, difficultyLevel,search);
    }

    async getPlanById(id){
        return await this.planRepository.getPlanById(id);
    }

    async createPlan(plan){
        await this.planRepository.createPlan(plan);
        return plan;
    }

    async updatePlan(plan, id){
        await this.planRepository.updatePlan(plan, id);
    }

    async deletePlan(id){
        return await this.planRepository.deletePlan(id);
    }
}