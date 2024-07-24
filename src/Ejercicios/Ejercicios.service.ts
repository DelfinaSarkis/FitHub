import { EjercicioRepository } from "./Ejercicios.repository";

export class EjercicioService {
    constructor(private readonly ejercicioRepository:EjercicioRepository){}

    async getEjercicios(){
        return await this.ejercicioRepository.getEjercicios();
    }

    async getEjerciciosById(id){
        return await this.ejercicioRepository.getEjercicioById(id);
    }

    async createEjercicio(ejercicio){
        await this.ejercicioRepository.createEjercicio(ejercicio);
        return ejercicio;
    }

    async updateEjercicio(ejercicio, id){
        await this.ejercicioRepository.updateEjercicio(id, ejercicio);
    }
}