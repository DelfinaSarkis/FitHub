/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Body, Get } from '@nestjs/common';
import { RutinaService } from './Rutinas.Service';
import { CreateRutinaDto } from './Rutinas.Dto';
import { UpdateRutinaDto } from './Rutinas.Dto';
import { Rutina } from './Rutina.entity';
import { UUID } from 'crypto';
import { ApiTags } from '@nestjs/swagger';
import { throwError } from 'rxjs';
@ApiTags('Rutina')
@Controller('rutina')
export class RutinaController {
  constructor(private readonly rutinaService: RutinaService) {}

  @Get()
  async getRutinas(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ): Promise<Rutina[]> {
    try {
      return await this.rutinaService.getRutinas(page, limit);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new HttpException(
          'Error en el servidor interno',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
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
