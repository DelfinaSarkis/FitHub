/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsArray, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { DifficultyLevel } from 'src/PlanDeEntranmiento/difficultyLevel.enum';

export class CreateRutinaDto {
  /**
    * Lista de UUIDs de los ejercicios
    * @example ["d4e5f6e7-8e4e-4aee-bbe4-fff67f46b33d", "e4e5f6e7-8e4e-4aee-bbe4-fff67f46b33d"]
  */
  @IsArray()
  @IsUUID('all', { each: true })
  exercise: string[];

  /**
    * UUID del administrador
    * @example "d4e5f6e7-8e4e-4aee-bbe4-fff67f46b33d"
  */
  @IsUUID('all')
  @IsNotEmpty()
  admin: string;

  /**
    * Lista de categorías
    * @example ["Cardio", "Strength"]
  */
  @IsArray()
  @IsUUID('all', { each: true })
  category: string[];

  /**
    * Nombre de la rutina
    * @example "Rutina de fuerza"
  */
  @IsNotEmpty()
  name: string;

  /**
    * Descripción de la rutina
    * @example "Rutina diseñada para mejorar la fuerza muscular."
  */
  @IsNotEmpty()
  description: string;

  /**
    * Nivel de dificultad de la rutina
    * @example "Intermediate"
  */
  @IsEnum(DifficultyLevel)
  @IsNotEmpty()
  difficultyLevel: DifficultyLevel;
}

export class UpdateRutinaDto {
  /**
    * Lista de UUIDs de los ejercicios (opcional)
    * @example ["d4e5f6e7-8e4e-4aee-bbe4-fff67f46b33d", "e4e5f6e7-8e4e-4aee-bbe4-fff67f46b33d"]
  */
  @IsArray()
  @IsUUID('all', { each: true })
  exercise?: string[];

  /**
    * UUID del administrador (opcional)
    * @example "d4e5f6e7-8e4e-4aee-bbe4-fff67f46b33d"
  */
  @IsUUID('all')
  @IsNotEmpty()
  admin?: string;

  /**
    * Lista de UUIDs de los ejercicios (opcional)
    * @example ["d4e5f6e7-8e4e-4aee-bbe4-fff67f46b33d", "e4e5f6e7-8e4e-4aee-bbe4-fff67f46b33d"]
  */
  @IsArray()
  @IsUUID('all', { each: true })
  category?: string[];

  /**
    * Nombre de la rutina (opcional)
    * @example "Rutina de fuerza"
  */
  @IsNotEmpty()
  name?: string;

  /**
    * Descripción de la rutina (opcional)
    * @example "Rutina diseñada para mejorar la fuerza muscular."
  */
  @IsNotEmpty()
  description?: string;

  /**
    * Nivel de dificultad de la rutina (opcional)
    * @example "Intermediate"
  */
  @IsEnum(DifficultyLevel)
  @IsNotEmpty()
  difficultyLevel?: DifficultyLevel;
}
