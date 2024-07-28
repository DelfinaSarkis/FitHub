/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsArray, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { DifficultyLevel } from 'src/PlanDeEntranmiento/difficultyLevel.enum';

export class CreateRutinaDto {
  @IsArray()
  @IsUUID('all', { each: true })
  exercise: string[];

  @IsUUID('all')
  @IsNotEmpty()
  admin: string;

  @IsArray()
  @IsUUID('all', { each: true })
  category: string[];

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(DifficultyLevel)
  @IsNotEmpty()
  difficultyLevel: DifficultyLevel;
}

export class UpdateRutinaDto {
  @IsArray()
  @IsUUID('all', { each: true })
  exercise?: string[];

  @IsUUID('all')
  @IsNotEmpty()
  admin?: string;

  @IsArray()
  @IsUUID('all', { each: true })
  category?: string[];

  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  description?: string;

  @IsEnum(DifficultyLevel)
  @IsNotEmpty()
  difficultyLevel?: DifficultyLevel;
}
