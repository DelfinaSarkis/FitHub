import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Plan } from "./Plan.entity";
import { ILike, Repository } from "typeorm";
import { Category } from "src/Category/Category.entity";
import { DifficultyLevel } from "./difficultyLevel.enum";

@Injectable()
export class PlanRepository {
    constructor(@InjectRepository(Plan) private planRepository:Repository<Plan>){}

    async getPlan(page: number, limit: number,category?:string,location?:string,difficultyLevel?:DifficultyLevel,search?:string) {
        
        let whereConditions: any = { isActive: true };
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
            const arrSearch = search.split(' ').filter(term => term.trim() !== '' && !stopWords.has(term.toLowerCase()));
            console.log(arrSearch);
            // Agregar términos individuales, excluyendo palabras de parada
            const termSearch = arrSearch.length > 0 ? arrSearch.map(term => ILike(`%${term}%`)) : [];
        
            // Crear condiciones de búsqueda
            whereConditions = arrSearch.map(term => ({...whereConditions,name:(ILike(`%${term}%`))}));
        }
        return this.planRepository.find({ 
            where: whereConditions,
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