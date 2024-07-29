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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRutinaDto {
  /**
    * Lista de UUIDs de los ejercicios
    * @example ["d4e5f6e7-8e4e-4aee-bbe4-fff67f46b33d", "e4e5f6e7-8e4e-4aee-bbe4-fff67f46b33d"]
  */
  @IsArray()
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  @ApiProperty({
    description: 'Lista de IDs de ejercicios asociados con la rutina',
    example: ['e40a0d72-8e8b-4d3c-95a4-5e7c6d8295bb', 'f0b2e45d-4a2b-4b07-8b0a-d05b6c43c573'],
  })
  ejercicio: UUID[];

  /**
    * UUID del administrador
    * @example "d4e5f6e7-8e4e-4aee-bbe4-fff67f46b33d"
  */
  @IsUUID('all')
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID del administrador que creó la rutina',
    example: 'e40a0d72-8e8b-4d3c-95a4-5e7c6d8295bb',
  })
  admin: UUID;

  /**
    * Categoría de la rutina
    * @example RutinaCategoria.CARDIO
  */
  @IsEnum(RutinaCategoria)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Categoría de la rutina',
    example: 'Cardio',
  })
  categoria: RutinaCategoria;
}

export class UpdateRutinaDto {
  /**
    * Lista de UUIDs de los ejercicios (opcional)
    * @example ["d4e5f6e7-8e4e-4aee-bbe4-fff67f46b33d", "e4e5f6e7-8e4e-4aee-bbe4-fff67f46b33d"]
  */
  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Lista de IDs de ejercicios asociados con la rutina (opcional)',
    example: ['e40a0d72-8e8b-4d3c-95a4-5e7c6d8295bb', 'f0b2e45d-4a2b-4b07-8b0a-d05b6c43c573'],
  })
  ejercicio?: UUID[];

  /**
    * UUID del administrador (opcional)
    * @example "d4e5f6e7-8e4e-4aee-bbe4-fff67f46b33d"
  */
  @IsUUID('all')
  @IsOptional()
  @ApiPropertyOptional({
    description: 'ID del administrador que creó la rutina (opcional)',
    example: 'e40a0d72-8e8b-4d3c-95a4-5e7c6d8295bb',
  })
  admin?: UUID;

  /**
    * Categoría de la rutina (opcional)
    * @example RutinaCategoria.CARDIO
  */
  @IsEnum(RutinaCategoria)
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Categoría de la rutina (opcional)',
    example: 'Cardio',
  })
  categoria?: RutinaCategoria;

  /**
    * Verificado (opcional)
    * @example true
  */
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Indicador de si la rutina está verificada (opcional)',
    example: true,
  })
  verificado?: boolean;

  /**
    * Lista de UUIDs de los ejercicios (opcional)
    * @example ["d4e5f6e7-8e4e-4aee-bbe4-fff67f46b33d", "e4e5f6e7-8e4e-4aee-bbe4-fff67f46b33d"]
  */
  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  ejercicios?: UUID[];

  /**
    * Lista de UUIDs de los usuarios (opcional)
    * @example ["d4e5f6e7-8e4e-4aee-bbe4-fff67f46b33d", "e4e5f6e7-8e4e-4aee-bbe4-fff67f46b33d"]
  */
  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Lista de IDs de ejercicios asociados con la rutina (opcional)',
    example: ['e40a0d72-8e8b-4d3c-95a4-5e7c6d8295bb', 'f0b2e45d-4a2b-4b07-8b0a-d05b6c43c573'],
  })
  users?: UUID[];

  /**
    * Lista de UUIDs de los comentarios (opcional)
    * @example ["d4e5f6e7-8e4e-4aee-bbe4-fff67f46b33d", "e4e5f6e7-8e4e-4aee-bbe4-fff67f46b33d"]
  */
  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Lista de IDs de comentarios asociados con la rutina (opcional)',
    example: ['e40a0d72-8e8b-4d3c-95a4-5e7c6d8295bb', 'f0b2e45d-4a2b-4b07-8b0a-d05b6c43c573'],
  })
  comentarios?: UUID[];
}
