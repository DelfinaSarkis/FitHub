import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { PlanService } from "./Plan.service";
import { Plan } from "./Plan.entity";
import { UUID } from "crypto";
import { ApiTags } from "@nestjs/swagger";
import { PlanCreateDto, PlanUpdateDto } from "./CreatePlan.dto";
import { Category } from "src/Category/Category.entity";
import { query, Request } from "express";
import { DifficultyLevel } from "./difficultyLevel.enum";
import { AuthGuard } from "src/Guard/AuthGuar.guard";
import { Console } from "console";
@ApiTags('Plan')
@Controller('plan')
export class PlanController {
    constructor(private readonly planService: PlanService){}

    //Queda funcionando correctamente, filtrando por categoría, localización, nivel de dificultad y búsqueda en el nombre
    @Get()
    async getPlan(@Query('page') page: string = '1', @Query('limit') limit: string = '10',@Query('category') category?:string,@Query('location')location?: string,@Query('difficultyLevel')difficultyLevel?:DifficultyLevel, @Query('search')search?:string): Promise<Plan[]> {
        return await this.planService.getPlan(page, limit,category,location,difficultyLevel,search);
    }
    //Queda funcionand correctamnete, trae un plan por id
    @Get(':id')
    async getPlanById(@Param('id') id:UUID){
        return await this.planService.getPlanById(id);
    }

    @Post()
    @UseGuards(AuthGuard)
    async createPlan(@Req()req,@Body() plan: PlanCreateDto){
        const user = req.user
        const admin = user.id
        return await this.planService.createPlan(plan,admin);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    async updatePlan(@Req()req,@Body() plan:PlanUpdateDto, @Param('id') id:UUID){
        const user = req.user
        const admin = user.id
        const identifiacion = id
        return await this.planService.updatePlan(plan, admin, identifiacion);
    }

    @Delete(':id')
    async deletePlan(@Param('id') id:UUID){
        return await this.planService.deletePlan(id);
    }
}