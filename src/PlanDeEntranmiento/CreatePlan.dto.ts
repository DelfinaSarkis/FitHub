import { IsEnum, IsNotEmpty, IsOptional, isString, IsString } from "class-validator";

import { DifficultyLevel } from "./difficultyLevel.enum";

export class PlanCreateDto {
    @IsString()
    @IsNotEmpty()
    name:string

    @IsString()
    @IsNotEmpty()
    category:string

    @IsString()
    @IsNotEmpty()
    description:string

    @IsString()
    @IsNotEmpty()
    location:string

    @IsEnum(DifficultyLevel)
    @IsNotEmpty()
    difficultyLevel:DifficultyLevel
}

export class PlanUpdateDto {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    name:string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    category:string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    description:string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    location:string

    @IsEnum(DifficultyLevel)
    @IsOptional()
    @IsNotEmpty()
    difficultyLevel:DifficultyLevel
}