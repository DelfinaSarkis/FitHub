import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EjercicioService } from './Ejercicios.service';
import { Ejercicio } from './Ejercicios.entity';
import { UUID } from 'crypto';
import { EjercicioDto } from './CreateEjercicio.dto';
import { AuthGuard } from 'src/Guard/AuthGuar.guard';

@ApiTags('Ejercicios')
@Controller('ejercicio')
export class EjercicioController {
  constructor(private readonly ejercicioService: EjercicioService) {}

  @Get()
  async getEjercicios(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10000',
    @Query('titulo') titulo?: string,
    @Query('descripcion') descripcion?: string,
    @Query('search') search?: string,
  ): Promise<Ejercicio[]> {
    return await this.ejercicioService.getEjercicios(
      page,
      limit,
      titulo,
      descripcion,
      search,
    );
  }

  @Get(':id')
  async getEjercicioById(@Param('id') id: UUID) {
    return await this.ejercicioService.getEjerciciosById(id);
  }

  //Bloquear para usuarios no coach
  @UseGuards(AuthGuard)
  @Post()
  async createEjercicio(@Req() req, @Body() ejercicio: EjercicioDto) {
    const userId = req.user.sub;
    return await this.ejercicioService.createEjercicio(ejercicio, userId);
  }

  @Put(':id')
  async updateEjercicio(
    @Body() ejercicio: EjercicioDto,
    @Param('id') id: UUID,
  ) {
    return await this.ejercicioService.updateEjercicio(ejercicio, id);
  }
}
