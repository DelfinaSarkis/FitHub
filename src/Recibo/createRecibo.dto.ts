import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReciboDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsOptional()
  planId: string[];

  @IsString()
  @IsOptional()
  rutinaId: string[];
}
