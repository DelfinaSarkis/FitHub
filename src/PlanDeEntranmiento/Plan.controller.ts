import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { PlanService } from "./Plan.service";
import { Plan } from "./Plan.entity";
import { UUID } from "crypto";
import { ApiTags } from "@nestjs/swagger";
import { PlanDto } from "./CreatePlan.dto";
import { Category } from "src/Category/Category.entity";
import { query } from "express";
import { DifficultyLevel } from "./difficultyLevel.enum";
@ApiTags('Plan')
@Controller('plan')
export class PlanController {
    constructor(private readonly planService: PlanService){}

    @Get()
    async getPlan(@Query('page') page: string = '1', @Query('limit') limit: string = '10',@Query('category') category?:string,@Query('location')location?: string,@Query('difficultyLevel')difficultyLevel?:DifficultyLevel, @Query('search')search?:string): Promise<Plan[]> {
        const render = await this.planService.getPlan(page, limit,category,location,difficultyLevel,search);
        return render;


        //try{
        //    
        //    return await this.planService.getPlan(page, limit,category,location,difficultyLevel,search);
        //} catch (error) {
        //    if (error instanceof NotFoundException){
        //        throw error;
        //    } else {
        //        throw new HttpException('Error en el servidor oooooooooo', HttpStatus.INTERNAL_SERVER_ERROR);
        //    }
        //}
    }

    @Get(':id')
    async getPlanById(@Param('id') id:UUID){
        return await this.planService.getPlanById(id);
    }

    @Post()
    async createPlan(@Body() plan: PlanDto){
        return await this.planService.createPlan(plan);
    }

    @Put(':id')
    async updatePlan(@Body() plan: PlanDto, @Param('id') id:UUID){
        return await this.planService.updatePlan(plan, id);
    }

    @Delete(':id')
    async deletePlan(@Param('id') id:UUID){
        return await this.planService.deletePlan(id);
    }
}