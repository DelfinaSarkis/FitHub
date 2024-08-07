/* eslint-disable @typescript-eslint/no-unused-vars */
import { InjectRepository } from '@nestjs/typeorm';
import { Rutina } from './Rutina.entity';
import { ILike, In, Repository } from 'typeorm';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from 'src/Category/Category.entity';
import { CreateRutinaDto } from './Rutinas.Dto';
import { Users } from 'src/User/User.entity';
import { Ejercicio } from 'src/Ejercicios/Ejercicios.entity';
import { UserRole } from 'src/User/User.enum';
import { Preference } from 'mercadopago';
import { client } from 'config/mercadoPagoRoutine.config';
import { error } from 'console';
import { decrypt } from 'dotenv';
import { ReciboService } from 'src/Recibo/recibo.service';
import { CreateReciboDto } from 'src/Recibo/createRecibo.dto';
import { Request, Response } from 'express';
import { StateRecibo } from 'src/Recibo/recibo.enum';

@Injectable()
export class RutinaRepository {
  constructor(
    @InjectRepository(Rutina)
    private readonly rutinaRepository: Repository<Rutina>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(Ejercicio)
    private exerciceRepository: Repository<Ejercicio>,
    private readonly reciboService: ReciboService,
  ) {}
  async getAllRutinas(
    page: number,
    limit: number,
    category?: string,
    location?: string,
    difficultyLevel?: string,
    search?: string,
  ) {
    let whereConditions: any = { isActive: true /*check: true*/ };

    if (category) {
      const categoria = await this.categoryRepository.findOne({
        where: { id: category },
      });
      whereConditions.category = categoria;
    }

    if (location) {
      whereConditions.location = location;
    }

    if (difficultyLevel) {
      whereConditions.difficultyLevel = difficultyLevel;
    }
    if (search) {
      const stopWords = new Set(['de', 'y', 'el', 'la', 'en', 'a', 'o']); // Lista de palabras de parada
      const arrSearch = search
        .split(' ')
        .filter(
          (term) => term.trim() !== '' && !stopWords.has(term.toLowerCase()),
        );

      whereConditions = arrSearch.map((term) => ({
        ...whereConditions,
        name: ILike(`%${term}%`),
      }));
    }
    console.log(whereConditions);
    return await this.rutinaRepository.find({
      where: whereConditions,
      skip: (page - 1) * limit,
      take: limit,
      relations: ['category', 'exercise'],
    });
  }
  async getRutinaById(id) {
    return await this.rutinaRepository.findOne({
      where: { id, isActive: true },
      relations: ['category', 'exercise'],
    });
  }
  async createRutina(rutina: CreateRutinaDto, userId: string) {
    const admin = await this.userRepository.findOne({ where: { id: userId } });
    if (!admin) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const category = await this.categoryRepository.find({
      where: { id: In(rutina.category) },
    });
    if (!category.length) {
      throw new BadRequestException('Categoria no encontrada');
    }

    const exercise = await this.exerciceRepository.find({
      where: { id: In(rutina.exercise) /*user: { id: userId }*/ },
      //relations: ['user'],
    });

    if (!exercise.length) {
      throw new BadRequestException('Ejercicio no encontrado');
    }
    return await this.rutinaRepository.save({
      ...rutina,
      admin,
      category,
      exercise,
    }); //Este metodo cambie por create
  }

  async updateRutina(rutina, id, user) {
    const userAdmin = await this.userRepository.findOne({
      where: { id: user.sub },
    });
    if (userAdmin.role !== UserRole.ADMIN) {
      const rutinaToUpdate = await this.rutinaRepository.findOne({
        where: { id: id, admin: userAdmin },
      });
      if (!rutinaToUpdate || rutinaToUpdate.isActive === false) {
        throw new NotFoundException('Plan no encontrado o eliminado');
      }
      if (rutina.category) {
        const category = await this.categoryRepository.find({
          where: { id: In(rutina.category) },
        });
        if (category.length !== rutina.category.length) {
          throw new NotFoundException('Categoria no encontrada');
        }
        rutinaToUpdate.category = category;
        await this.rutinaRepository.save(rutinaToUpdate);
      }
      const { category, ...rutinaSinCategory } = rutinaToUpdate;
      return await this.rutinaRepository.update(id, rutinaToUpdate);
    } else if (userAdmin.role === UserRole.ADMIN) {
      const rutinaToUpdate = await this.rutinaRepository.findOne({
        where: { id: id },
      });
      if (!rutinaToUpdate || rutinaToUpdate.isActive === false) {
        throw new NotFoundException('Plan no encontrado o eliminado');
      }
      if (rutina.category) {
        const category = await this.categoryRepository.find({
          where: { id: In(rutina.category) },
        });
        if (category.length !== rutina.category.length) {
          throw new NotFoundException('Categoria no encontrada');
        }
        rutinaToUpdate.category = category;
      }
      const { category, ...rutinaSinCategory } = rutinaToUpdate;
      return await this.rutinaRepository.update(id, rutinaSinCategory);
    }
  }
  async deleteRutina(id, user) {
    const rutina = await this.rutinaRepository.findOne({ where: { id } });

    if (!rutina || rutina.isActive === false) {
      throw new NotFoundException('Rutina no encontrada o eliminada');
    }

    if (user.role !== UserRole.ADMIN) {
      const userSolicitud = await this.userRepository.findOne({
        where: { id: user.sub },
      });
      if (rutina.admin.id !== user.id) {
        throw new BadRequestException(
          'No tines capacidad de eliminar esta rutina',
        );
      }
      await this.rutinaRepository.update(id, { isActive: false });
      return 'Rutina eliminada';
    } else {
      await this.rutinaRepository.update(id, { isActive: false });
      return 'Rutina eliminada';
    }
  }

  ////////////////////////////////Mercado Pago///////////////////////////////////////////

  async createOrderRoutine(req: Request, res: Response) {
    try {
      const body = {
        items: [
          {
            id: req.body.id,
            title: req.body.title,
            rutinaId: req.body.rutinaId,
            quantity: 1,
            unit_price: Number(req.body.unit_price),
            currency_id: 'ARS',
          },
        ],
        back_urls: {
          success: 'http://localhost:3000/mercadoPago/success',
          failure: 'http://localhost:3000/mercadoPago/failure',
        },
        auto_return: 'approved',
      };

      const preference = new Preference(client);
      const result = await preference.create({ body });
      res.json({
        id: result.id,
      });
      console.log(result, ' result.........');
      const userId = req.body.id;
      const rutinaId = req.body.rutinaId;
      const user = await this.userRepository.findOne({where: {id: userId},relations: ['routine']});

      if (!user) {
        throw new ConflictException('Usuario no encontrado');
      }
      const rutina = await this.rutinaRepository.findOne({where:{id:rutinaId}});
      if (!rutina) {
        throw new ConflictException('Rutina no encontrada');
      }
      if (user.routine.some(existingRutina => existingRutina.id === rutinaId)) {
        throw new ConflictException('La rutina ya está asociada con este usuario');
      }

      user.routine.push(rutina);
      await this.userRepository.save(user);

      const reciboData = {
        user,
        rutinas: [rutina],
        planes: [],
        price: Number(req.body.unit_price),
        state: StateRecibo.PAGADO,
      };

      await this.reciboService.createRecibo(reciboData);

      return result;
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al crear la preferencia de pago');
    }
  }
}
