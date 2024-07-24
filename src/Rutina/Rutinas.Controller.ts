import { Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { Body, Get } from '@nestjs/common';
import { RutinaService } from './Rutinas.Service';
import { CreateRutinaDto } from './Rutinas.Dto';
import { UpdateRutinaDto } from './Rutinas.Dto';
import { Rutina } from './Rutina.entity';
import { UUID } from 'crypto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Rutina')
@Controller('rutina')
export class RutinaController {
  constructor(private readonly rutinaService: RutinaService) {}

  @Get()
  async getRutinas(): Promise<Rutina[]> {
    return await this.rutinaService.getRutinas();
  }

  @Get(':id')
  async getRutinaById(@Param('id') id: UUID) {
    return await this.rutinaService.getRutinaById(id);
  }

  @Post()
  async createRutina(@Body() rutina: CreateRutinaDto) {
    return await this.rutinaService.createRutina(rutina);
  }

  @Put(':id')
  async updateRutina(@Body() rutina: UpdateRutinaDto, @Param('id') id: UUID) {
    return await this.rutinaService.updateRutina(rutina, id);
  }

  @Delete(':id')
  async deleteRutina(@Param('id') id: UUID) {
    return await this.rutinaService.deleteRutina(id);
  }
}
