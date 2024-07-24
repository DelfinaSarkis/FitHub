import { InjectRepository } from '@nestjs/typeorm';
import { Rutina } from './Rutina.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

export class RutinaRepository {
  constructor(
    @InjectRepository(Rutina)
    private readonly rutinaRepository: Repository<Rutina>,
  ) {}
  async getAllRutinas() {
    return await this.rutinaRepository.find();
  }
  async getRutinaById(id) {
    return await this.rutinaRepository.findOne({ where: { id } });
  }
  async createRutina(rutina) {
    await this.rutinaRepository.save(rutina);
    return 'Rutina creada';
  }
  async updateRutina(rutina, id) {
    await this.rutinaRepository.update(id, rutina);
    return 'La rutina esta actualizada';
  }
  async deleteRutina(id) {
    const rutina = await this.rutinaRepository.findOne({ where: { id } });
    if (!rutina) {
      throw new BadRequestException('La rutina no existe');
    }
    await this.rutinaRepository.remove(rutina);
    return 'Rutina eliminada';
  }
}
