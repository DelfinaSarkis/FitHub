import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rutina } from './Rutina.entity';
import { RutinaController } from './Rutinas.Controller';
import { RutinaService } from './Rutinas.Service';
import { RutinaRepository } from './Rutina.reposity';
import { Category } from 'src/Category/Category.entity';
import { Users } from 'src/User/User.entity';
import { Ejercicio } from 'src/Ejercicios/Ejercicios.entity';
import { ReciboModule } from 'src/Recibo/recibo.module';
import { ReciboService } from 'src/Recibo/recibo.service';
import { Recibo } from 'src/Recibo/recibo.entity';
import { ReciboRepository } from 'src/Recibo/recibo.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rutina, Category, Users, Ejercicio, Recibo]),
    ReciboModule,
  ],
  controllers: [RutinaController],
  providers: [RutinaService, RutinaRepository, ReciboService, ReciboRepository],
})
export class RutinaModule {}
