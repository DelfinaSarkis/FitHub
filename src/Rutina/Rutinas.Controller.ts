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
  Req,
  UseGuards,
} from '@nestjs/common';
import { Body, Get } from '@nestjs/common';
import { RutinaService } from './Rutinas.Service';
import { CreateRutinaDto } from './Rutinas.Dto';
import { UpdateRutinaDto } from './Rutinas.Dto';
import { Rutina } from './Rutina.entity';
import { UUID } from 'crypto';
import { ApiTags } from '@nestjs/swagger';
import { throwError } from 'rxjs';
import { DifficultyLevel } from 'src/PlanDeEntranmiento/difficultyLevel.enum';
import { auth } from 'express-openid-connect';
import { AuthGuard } from 'src/Guard/AuthGuar.guard';
@ApiTags('Rutina')
@Controller('rutina')
export class RutinaController {
  constructor(private readonly rutinaService: RutinaService) {}

  @Get()
  async getRutinas(@Query('page') page: string = '1', @Query('limit') limit: string = '10',@Query('category') category?:string,@Query('location')location?: string,@Query('difficultyLevel')difficultyLevel?:DifficultyLevel, @Query('search')search?:string): Promise<Rutina[]> {
    console.log(category)
    return await this.rutinaService.getRutinas(page, limit, category, location, difficultyLevel, search);
  }

  @Get(':id')
  async getRutinaById(@Param('id') id: UUID) {
    return await this.rutinaService.getRutinaById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createRutina(@Req() req,@Body() rutina: CreateRutinaDto) {
    const userId = req.user.sub;
    return await this.rutinaService.createRutina(rutina, userId);
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
