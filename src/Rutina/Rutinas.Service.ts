import { Injectable } from '@nestjs/common';
import { RutinaRepository } from './Rutina.reposity';
import { CreateRutinaDto } from './Rutinas.Dto';
import { ReciboService } from 'src/Recibo/recibo.service';

@Injectable()
export class RutinaService {
  constructor(
    private readonly rutinasRepository: RutinaRepository,
    private readonly reciboService: ReciboService,
  ) {}

  async getRutinas(
    page: string,
    limit: string,
    category?: string,
    location?: string,
    difficultyLevel?: string,
    search?: string,
  ) {
    return await this.rutinasRepository.getAllRutinas(
      Number(page),
      Number(limit),
      category,
      location,
      difficultyLevel,
      search,
    );
  }
  async getRutinaById(id) {
    return await this.rutinasRepository.getRutinaById(id);
  }
  async createRutina(rutina: CreateRutinaDto, userId) {
    return await this.rutinasRepository.createRutina(rutina, userId);
  }
  async createOrderRoutine(req, res) {
    const ordenCreada = await this.rutinasRepository.createOrderRoutine(
      req,
      res,
    );

    const reciboDeCompra = {
      userId: req.body.id,
      rutinaId: [req.body.rutinaId],
      planId: [],
    };

    const reciboGuardado =
      await this.reciboService.createRecibo(reciboDeCompra);
    console.log(reciboGuardado);
    return 'recibo creado';
  }
  async updateRutina(rutina, id, user) {
    return await this.rutinasRepository.updateRutina(rutina, id, user);
  }
  async deleteRutina(id, user) {
    return await this.rutinasRepository.deleteRutina(id, user);
  }
}
