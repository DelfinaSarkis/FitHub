import { InjectRepository } from "@nestjs/typeorm";
import { Ejercicio } from "./Ejercicios.entity";
import { Repository } from "typeorm";

export class EjercicioRepository {
    constructor(@InjectRepository(Ejercicio) private readonly ejercicioRepository: Repository<Ejercicio>){}
    
    async getEjercicios(){
        return await this.ejercicioRepository.find();
    }

    async getEjercicioById(id){
        return await this.ejercicioRepository.findOne({ where: {id} });
    }

    async createEjercicio(ejercicio){
        await this.ejercicioRepository.save(ejercicio);
        return 'Ejercicio creado';
    }

    async updateEjercicio(ejercicio, id){
        await this.ejercicioRepository.update(id, ejercicio);
        return 'El ejercicio se ha actualizado';
    }
}