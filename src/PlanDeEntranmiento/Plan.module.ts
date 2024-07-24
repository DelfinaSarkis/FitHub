import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Plan } from "./Plan.entity";
import { PlanController } from "./Plan.controller";
import { PlanRepository } from "./Plan.repository";
import { PlanService } from "./Plan.service";

@Module({
    imports: [TypeOrmModule.forFeature([Plan])],
    providers:[PlanService, PlanRepository],
    controllers: [PlanController],
})

export class PlanModule {}