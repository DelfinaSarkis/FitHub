import { Injectable } from '@nestjs/common';
import { RutinaRepository } from './Rutina.reposity';

@Injectable()
export class RutinaService {
  constructor(private readonly rutinasRepository: RutinaRepository) {}

  async getRutinas(page: string, limit: string, category?:string[], location?:string, difficultyLevel?:string, search?:string) {
    return this.rutinasRepository.getAllRutinas(Number(page), Number(limit), category, location, difficultyLevel, search);
  }
  async getRutinaById(id) {
    return await this.rutinasRepository.getRutinaById(id);
  }
  async createRutina(rutina) {
    await this.rutinasRepository.createRutina(rutina);
    return rutina;
  }
  async updateRutina(rutina, id) {
    return await this.rutinasRepository.updateRutina(rutina, id);
  }
  async deleteRutina(id) {
    return await this.rutinasRepository.deleteRutina(id);
  }
}
