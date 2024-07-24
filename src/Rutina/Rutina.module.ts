import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rutina } from './Rutina.entity';
import { RutinaController } from './Rutinas.Controller';
import { RutinaService } from './Rutinas.Service';
import { RutinaRepository } from './Rutina.reposity';

@Module({
  imports: [TypeOrmModule.forFeature([Rutina])],
  controllers: [RutinaController],
  providers: [RutinaService, RutinaRepository],
})
export class RutinaModule {}
