import { RutinaRepository } from './Rutina.reposity';

export class RutinaService {
  constructor(private readonly rutinasRepository: RutinaRepository) {}
  async getRutinas(page: string, limit: string) {
    return this.rutinasRepository.getAllRutinas(Number(page), Number(limit));
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
