import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
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
    async getPlan(): Promise<Plan[]> {
        return await this.planService.getPlan();
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