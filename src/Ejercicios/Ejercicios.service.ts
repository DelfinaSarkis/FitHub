import { Injectable } from '@nestjs/common';
import { EjercicioRepository } from './Ejercicios.repository';
import { EjercicioDto } from "./CreateEjercicio.dto";


@Injectable()
export class EjercicioService {
  constructor(private readonly ejercicioRepository: EjercicioRepository) {}

  async getEjercicios() {
    return await this.ejercicioRepository.getEjercicios();
  }

    async getEjerciciosById(id: string){
        return await this.ejercicioRepository.getEjercicioById(id);
    }

    async createEjercicio(ejercicio: EjercicioDto, userId:string){
        return await this.ejercicioRepository.createEjercicio(ejercicio,userId);
    }

    async updateEjercicio(ejercicio: EjercicioDto, id: string){
        await this.ejercicioRepository.updateEjercicio(id, ejercicio);
    }
}

