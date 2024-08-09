import { IsArray, IsNotEmpty } from "class-validator"

export class respuestaDto {

    @IsNotEmpty()
    @IsArray()
    coach: string[]

    @IsNotEmpty()
    @IsArray()
    plan: string[]

    @IsNotEmpty()
    @IsArray()
    rutina: string[]
}