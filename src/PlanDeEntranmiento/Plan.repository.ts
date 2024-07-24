import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Plan } from "./Plan.entity";
import { Repository } from "typeorm";

@Injectable()
export class PlanRepository {
    constructor(@InjectRepository(Plan) private planRepository: Repository<Plan>){}

    async getPlan(page: number, limit: number) {
        return this.planRepository.find({ 
            where: { isActive: true },
            skip: (page - 1) * limit,
            take: limit
        });
    }

    async getPlanById(id){
        return await this.planRepository.findOne( { where: {id, isActive:true} } );
    }

    async createPlan(plan) {
        await this.planRepository.save(plan);
        return 'Plan creado';
    }

    async updatePlan(plan, id){
        await this.planRepository.update(id, plan);
        const updatedPlan = await this.planRepository.findOneBy({ id, isActive:true });
        return updatedPlan;
    }

    async deletePlan(id){
        const plan = await this.planRepository.findOne({ where: { id: id } });
        if (!plan || plan.isActive === false) { throw new NotFoundException('Plan no encontrado o eliminado')};
        await this.planRepository.update( id, {...plan, isActive: false});

        return id;
    }
}