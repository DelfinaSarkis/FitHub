import { InjectRepository } from '@nestjs/typeorm';
import { Rutina } from './Rutina.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

export class RutinaRepository {
  constructor(
    @InjectRepository(Rutina)
    private readonly rutinaRepository: Repository<Rutina>,
  ) {}
  async getAllRutinas(page: number, limit: number) {
    return this.rutinaRepository.find({
      where: { isActive: true},
      skip: (page - 1) * limit,
      take: limit
    });
  }
  async getRutinaById(id) {
    return await this.rutinaRepository.findOne({ where: { id, isActive:true } });
  }
  async createRutina(rutina) {
    await this.rutinaRepository.save(rutina);
    return 'Rutina creada';
  }
  async updateRutina(rutina, id) {
    const existingRoutine = await this.rutinaRepository.findOneBy({ id });
    if(!existingRoutine){
      throw new Error('Rutina no encontrada');
    }
    await this.rutinaRepository.update(id, rutina);
    const updateRutina = await this.rutinaRepository.findOneBy({ id });
    return updateRutina;
  }
  async deleteRutina(id) {
    const rutina = await this.rutinaRepository.findOne({ where: { id } });
    if (!rutina|| rutina.isActive === false) {
      throw new BadRequestException('Rutina no encontrada o eliminada');
    }
    await this.rutinaRepository.remove(rutina);
    return 'Rutina eliminada';
  }
}
