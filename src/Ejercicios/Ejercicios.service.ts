import { EjercicioDto } from "./CreateEjercicio.dto";
import { EjercicioRepository } from "./Ejercicios.repository";

export class EjercicioService {
    constructor(private readonly ejercicioRepository:EjercicioRepository){}

    async getEjercicios(){
        return await this.ejercicioRepository.getEjercicios();
    }

    async getEjerciciosById(id: string){
        return await this.ejercicioRepository.getEjercicioById(id);
    }

    async createEjercicio(ejercicio: EjercicioDto){
        await this.ejercicioRepository.createEjercicio(ejercicio);
        return ejercicio;
    }

    async updateEjercicio(ejercicio: EjercicioDto, id: string){
        await this.ejercicioRepository.updateEjercicio(id, ejercicio);
    }
}