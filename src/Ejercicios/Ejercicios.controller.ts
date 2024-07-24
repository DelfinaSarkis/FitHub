import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EjercicioService } from "./Ejercicios.service";
import { Ejercicio } from "./Ejercicios.entity";
import { UUID } from "crypto";
import { EjercicioDto } from "./CreateEjercicio.dto";


@ApiTags('Ejercicios')
@Controller('ejercicio')
export class EjercicioController {
    constructor(private readonly ejercicioService: EjercicioService){}

    @Get()
    async getEjercicios(): Promise<Ejercicio[]>{
        return await this.ejercicioService.getEjercicios();
    }

    @Get(':id')
    async getEjercicioById(@Param('id') id:UUID) {
        return await this.ejercicioService.getEjerciciosById(id);
    }

    @Post()
    async createEjercicio(@Body() ejercicio: EjercicioDto){
        return await this.ejercicioService.createEjercicio(ejercicio);
    }

    @Put(':id')
    async updateEjercicio(@Body() ejercicio: EjercicioDto, @Param('id') id:UUID){
        return await this.ejercicioService.updateEjercicio(ejercicio, id);
    }
}