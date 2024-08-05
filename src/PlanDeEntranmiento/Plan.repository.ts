/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from './Plan.entity';
import { Check, ILike, In, Repository } from 'typeorm';
import { Category } from 'src/Category/Category.entity';
import { DifficultyLevel } from './difficultyLevel.enum';
import { PlanCreateDto } from './CreatePlan.dto';
import { Users } from 'src/User/User.entity';
import { UserRole } from 'src/User/User.enum';
import { Preference } from 'mercadopago';
import { Suscripciones } from 'src/Suscripciones/Suscripciones.entity';
import { SubscriptionsRepository } from 'src/Suscripciones/suscripciones.repository';
import { planClient } from 'config/mercadoPagoPlan.config';

@Injectable()
export class PlanRepository {
  constructor(
    @InjectRepository(Plan) private planRepository: Repository<Plan>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private readonly subscriptionsRepository: SubscriptionsRepository,
  ) {}

  async getPlan(
    page: number,
    limit: number,
    category?: string,
    location?: string,
    difficultyLevel?: DifficultyLevel,
    search?: string,
  ) {
    const whereConditions: any = { isActive: true };

    if (category) {
      const categoria = await this.categoryRepository.find({
        where: { id: category },
      });
      whereConditions.category = categoria;
    }

    if (location !== undefined) {
      whereConditions.location = ILike(`%${location}`);
    }

    if (difficultyLevel !== undefined) {
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
        description: ILike(`%${term}%`),
      }));
    }
    return this.planRepository.find({
      where: whereConditions,
      skip: (page - 1) * limit,
      take: limit,
      relations: ['category'],
    });
  }

  async getPlanById(id) {
    return await this.planRepository.findOne({ where: { id, isActive: true } });
  }

  //Validar que es profe
  async createPlan(plan: PlanCreateDto, admin: string) {
    const adm = await this.userRepository.findOne({ where: { id: admin } });
    if (!adm) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const category = await this.categoryRepository.find({
      where: { id: In(plan.category) },
    });
    if (category.length !== plan.category.length) {
      throw new NotFoundException('Categoria no encontrada');
    }

    console.log(category);

    const planCreado = await this.planRepository.create({
      ...plan,
      admin: adm,
      category: category,
    });
    await this.planRepository.save(planCreado);
    return planCreado;
  }
  async updatePlan(plan, admin, identificacion) {
    const userAdmin = await this.userRepository.findOne({
      where: { id: admin },
    });
    if (userAdmin.role !== UserRole.ADMIN) {
      const planToUpdate = await this.planRepository.findOne({
        where: { id: identificacion, admin: userAdmin },
      });
      if (!planToUpdate || planToUpdate.isActive === false) {
        throw new NotFoundException('Plan no encontrado o eliminado');
      }
      if (plan.categoryToUpdate) {
        const category = await this.categoryRepository.find({
          where: { id: In(plan.categoryToUpdate) },
        });
        if (category.length !== plan.categoryToUpdate.length) {
          throw new NotFoundException('Categoria no encontrada');
        }
        planToUpdate.category = category;
        await this.planRepository.save(planToUpdate);
      }
      const { categoryToUpdate, ...planSinCategory } = plan;
      console.log(planSinCategory);
      return await this.planRepository.update(identificacion, planSinCategory);
    } else if (userAdmin.role === UserRole.ADMIN) {
      const planToUpdate = await this.planRepository.findOne({
        where: { id: identificacion },
      });
      if (!planToUpdate || planToUpdate.isActive === false) {
        throw new NotFoundException('Plan no encontrado o eliminado');
      }
      if (plan.category) {
        const category = await this.categoryRepository.find({
          where: { id: In(plan.category) },
        });
        if (category.length !== plan.category.length) {
          throw new NotFoundException('Categoria no encontrada');
        }
        planToUpdate.category = category;
      }
      return await this.planRepository.update(identificacion, plan);
    }
  }

  async deletePlan(id: string, user) {
    const plan = await this.planRepository.findOne({
      where: { id: id },
      relations: ['admin'],
    });
    if (!plan || plan.isActive === false) {
      throw new NotFoundException('Plan no encontrado o eliminado');
    }

    if (user.role !== UserRole.ADMIN) {
      const userSub = await this.userRepository.findOne({
        where: { id: user.sub },
      });
      console.log(userSub);
      console.log('--------------------');
      console.log(plan.admin);
      if (plan.admin.id !== userSub.id) {
        throw new BadRequestException(
          'No tines capacidad de eliminar este plan',
        );
      }
      await this.planRepository.update(id, { ...plan, isActive: false });
    } else {
      await this.planRepository.update(id, { ...plan, isActive: false });
    }
    return 'El plan de entrenamiento ha sido eliminado';
  }

  ////////////////////////////////Mercado Pago///////////////////////////////////////////

  async createOrderPlan(req, res) {
    try {
      const body = {
        items: [
          {
            id: req.body.id,
            title: req.body.title,
            planId: req.body.planId,
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

      const preference = new Preference(planClient);
      const result = await preference.create({ body });
      res.json({ id: result.id });

      const userId = req.body.userId;
      const planId = req.body.planId;

      this.handlePaymentSuccess(userId, planId);
    } catch (error) {
      console.error('Error al crear la preferencia de pago:', error);
      res.status(500).send('Error al crear la preferencia de pago');
    }
  }

  async handlePaymentSuccess(userId: string, planId: string) {
    try {
      await this.subscriptionsRepository.createSubscription(userId, planId);
    } catch (error) {
      console.error('Error al crear la suscripción:', error);
    }
  }
}
