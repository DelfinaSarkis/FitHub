import { IsEnum, IsNotEmpty, IsOptional, isString, IsString } from "class-validator";

import { DifficultyLevel } from "./difficultyLevel.enum";

export class PlanCreateDto {
    /**
    * Nombre del plan
    * @example "Plan de Entrenamiento Básico"
    */
    @IsString()
    @IsNotEmpty()
    name:string

    /**
    * Categoría del plan
    * @example "Cardio"
    */
    @IsString()
    @IsNotEmpty()
    category:string

    /**
    * Descripción del plan
    * @example "Este es un plan diseñado para mejorar la resistencia cardiovascular."
    */
    @IsString()
    @IsNotEmpty()
    description:string

    /**
    * Ubicación del plan
    * @example "Gimnasio Central"
    */
    @IsString()
    @IsNotEmpty()
    location:string

    /**
    * Nivel de dificultad del plan
    * @example DifficultyLevel.MEDIUM
    */
    @IsEnum(DifficultyLevel)
    @IsNotEmpty()
    difficultyLevel:DifficultyLevel
}

export class PlanUpdateDto {
    /**
    * Nombre del plan (opcional)
    * @example "Plan de Entrenamiento Avanzado"
    */
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    name:string

    /**
    * Categoría del plan (opcional)
    * @example "Fuerza"
    */
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    category:string

    /**
    * Descripción del plan (opcional)
    * @example "Este es un plan diseñado para aumentar la fuerza muscular."
    */
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    description:string

    /**
    * Ubicación del plan (opcional)
    * @example "Gimnasio Este"
    */
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    location:string

    /**
    * Nivel de dificultad del plan (opcional)
    * @example DifficultyLevel.HARD
    */
    @IsEnum(DifficultyLevel)
    @IsOptional()
    @IsNotEmpty()
    difficultyLevel:DifficultyLevel
}