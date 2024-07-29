/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  isString,
  IsString,
  IsUUID,
} from 'class-validator';
import { DifficultyLevel } from './difficultyLevel.enum';
import { UUID } from 'crypto';

export class PlanCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  category: UUID[];

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsEnum(DifficultyLevel)
  @IsNotEmpty()
  difficultyLevel: DifficultyLevel;
}

export class PlanUpdateDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  categoryToUpdate: UUID[];

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  location: string;

  @IsEnum(DifficultyLevel)
  @IsOptional()
  @IsNotEmpty()
  difficultyLevel: DifficultyLevel;
}
