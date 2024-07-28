import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ejercicio } from './Ejercicios.entity';
import { EjercicioController } from './Ejercicios.controller';
import { EjercicioService } from './Ejercicios.service';
import { EjercicioRepository } from './Ejercicios.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Ejercicio])],
  providers: [EjercicioService, EjercicioRepository],
  controllers: [EjercicioController],
  exports: [EjercicioService],
})
export class EjercicoModule {}
