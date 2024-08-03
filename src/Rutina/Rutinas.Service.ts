import { ConflictException, Injectable } from '@nestjs/common';
import { RutinaRepository } from './Rutina.reposity';
import { CreateRutinaDto } from './Rutinas.Dto';
import { ReciboService } from 'src/Recibo/recibo.service';
import { Request, Response } from 'express';
import { StateRecibo } from 'src/Recibo/recibo.enum';

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
  async createOrderRoutine(req: Request, res: Response) {
    const ordenCreada = await this.rutinasRepository.createOrderRoutine(
      req,
      res,
    );

    if (!ordenCreada || undefined) {
      throw new ConflictException('No se pudo ejecutar la orden de compra');
    }

    const reciboDeCompra = {
      userId: req.body.id,
      rutinaId: req.body.rutinaId,
      planId: [],
      price: req.body.unit_price,
      state: StateRecibo.PAGADO,
    };

    const reciboGuardado =
      await this.reciboService.createRecibo(reciboDeCompra);
    if (!reciboGuardado || undefined) {
      throw new ConflictException('No se pudo crear el recibo');
    }
    return 'recibo creado';
  }
  async updateRutina(rutina, id, user) {
    return await this.rutinasRepository.updateRutina(rutina, id, user);
  }
  async deleteRutina(id, user) {
    return await this.rutinasRepository.deleteRutina(id, user);
  }
}
