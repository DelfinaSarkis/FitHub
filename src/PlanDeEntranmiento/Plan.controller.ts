import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { PlanService } from "./Plan.service";
import { Plan } from "./Plan.entity";
import { UUID } from "crypto";
import { ApiTags } from "@nestjs/swagger";
import { PlanDto } from "./CreatePlan.dto";
@ApiTags('Plan')
@Controller('plan')
export class PlanController {
    constructor(private readonly planService: PlanService){}

    @Get()
    async getPlan(@Query('page') page: string = '1', @Query('limit') limit: string = '5'): Promise<Plan[]> {
        try{
            return await this.planService.getPlan(page, limit);
        } catch (error) {
            if (error instanceof NotFoundException){
                throw error;
            } else {
                throw new HttpException('Error en el servidor interno', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
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