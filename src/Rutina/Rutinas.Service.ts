import { ConflictException, Injectable } from '@nestjs/common';
import { RutinaRepository } from './Rutina.reposity';
import { CreateRutinaDto } from './Rutinas.Dto';
import { ReciboService } from 'src/Recibo/recibo.service';
import { Request, Response } from 'express';
import { StateRecibo } from 'src/Recibo/recibo.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/User/User.entity';
import { Repository } from 'typeorm';
import { Recibo } from 'src/Recibo/recibo.entity';
import { Rutina } from './Rutina.entity';
import { Plan } from 'src/PlanDeEntranmiento/Plan.entity';
import { CreateReciboDto } from 'src/Recibo/createRecibo.dto';
import { FilesUploadService } from 'src/files-upload/files-upload.service';

@Injectable()
export class RutinaService {
  constructor(
    private readonly filesUploadService: FilesUploadService,
    private readonly rutinasRepository: RutinaRepository,
    private readonly reciboService: ReciboService,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Recibo)
    private readonly reciboRepository: Repository<Recibo>,
    @InjectRepository(Rutina)
    private readonly rutinaRepository: Repository<Rutina>,
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
  async createRutina(rutina: CreateRutinaDto, userId: string) {
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

    const userId = req.body.id;
    const rutinaId = req.body.rutinaId;
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new ConflictException('Usuario no encontrado');
    }
    console.log(user);
    const rutina = await this.rutinasRepository.getRutinaById(rutinaId);
    if (!rutina) {
      throw new ConflictException('Rutina no encontrada');
    }
    console.log(rutina);

    const reciboDeCompra: CreateReciboDto = {
      user: user,
      rutina,
      price: req.body.unit_price,
      state: StateRecibo.PAGADO,
    };
    const reciboGuardado = await this.reciboRepository.save(reciboDeCompra);
    if (!reciboGuardado) {
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
