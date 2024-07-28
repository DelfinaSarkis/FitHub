import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rutina } from './Rutina.entity';
import { RutinaController } from './Rutinas.Controller';
import { RutinaService } from './Rutinas.Service';
import { RutinaRepository } from './Rutina.reposity';
import { Category } from 'src/Category/Category.entity';
import { Users } from 'src/User/User.entity';
import { Ejercicio } from 'src/Ejercicios/Ejercicios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rutina,Category,Users,Ejercicio])],
  controllers: [RutinaController],
  providers: [RutinaService, RutinaRepository],
})
export class RutinaModule {}
