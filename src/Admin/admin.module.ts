import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Type } from "class-transformer";
import { Invoice } from "mercadopago";
import { Plan } from "src/PlanDeEntranmiento/Plan.entity";
import { Recibo } from "src/Recibo/recibo.entity";
import { Rutina } from "src/Rutina/Rutina.entity";
import { Suscripciones } from "src/Suscripciones/Suscripciones.entity";
import { Users } from "src/User/User.entity";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { AdminRepository } from "./admin.Repository";

@Module({
    imports: [TypeOrmModule.forFeature([Users, Rutina, Plan, Recibo, Suscripciones, Invoice])],
    controllers: [AdminController],
    providers: [AdminService,AdminRepository],
    exports: [],
})
export class AdminModule {}