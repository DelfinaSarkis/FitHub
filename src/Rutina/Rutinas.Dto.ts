import { UUID } from 'crypto';
import { RutinaCategoria } from './Rutina.enum';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateRutinaDto {
  @IsArray()
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  ejercicio: UUID[];

  @IsUUID('all')
  @IsNotEmpty()
  admin: UUID;

  @IsEnum(RutinaCategoria)
  @IsNotEmpty()
  categoria: RutinaCategoria;
}

export class UpdateRutinaDto {
  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  ejercicio?: UUID[];

  @IsUUID('all')
  @IsOptional()
  admin?: UUID;

  @IsEnum(RutinaCategoria)
  @IsOptional()
  categoria?: RutinaCategoria;

  @IsBoolean()
  @IsOptional()
  verificado?: boolean;

  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  ejercicios?: UUID[];

  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  users?: UUID[];

  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  comentarios?: UUID[];
}
