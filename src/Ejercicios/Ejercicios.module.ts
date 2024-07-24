import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Ejercicio } from "./Ejercicios.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Ejercicio])],
    providers: [],
    controllers: [],
})

export class EjercicoModule{}