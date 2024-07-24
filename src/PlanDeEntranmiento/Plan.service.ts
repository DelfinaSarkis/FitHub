import { PlanRepository } from "./Plan.repository";

export class PlanService {
    constructor(private readonly planRepository: PlanRepository){}
    async getPlan(page: string, limit: string){
        return this.planRepository.getPlan(Number(page), Number(limit));
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