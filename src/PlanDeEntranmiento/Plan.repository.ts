import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Plan } from "./Plan.entity";
import { Repository } from "typeorm";

@Injectable()
export class PlanRepository {
    constructor(@InjectRepository(Plan) private planRepository: Repository<Plan>){}

    async getPlan() {
        return await this.planRepository.find({ where: { active: true } });
    }

    async getPlanById(id){
        return await this.planRepository.findOne( { where: {id, active:true} } );
    }

    async createPlan(plan) {
        await this.planRepository.save(plan);
        return 'Plan creado';
    }

    async updatePlan(plan, id){
        await this.planRepository.update(id, plan);
        return 'El plan se ha actualizado';
    }

    async deletePlan(id){
        const plan = await this.planRepository.findOne({ where: { id: id } });
        if (!plan || plan.active === false) { throw new NotFoundException('Plan no encontrado o eliminado')};
        await this.planRepository.update( id, {...plan, active: false});

        return id;
    }
}