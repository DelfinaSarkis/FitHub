import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Plan } from "./Plan.entity";
import { PlanController } from "./Plan.controller";
import { PlanRepository } from "./Plan.repository";
import { PlanService } from "./Plan.service";
import { AuthGuard } from "src/Guard/AuthGuar.guard";
import { Users } from "src/User/User.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Plan, Users])],
    providers:[PlanService, PlanRepository,AuthGuard],
    controllers: [PlanController],
})

export class PlanModule {}