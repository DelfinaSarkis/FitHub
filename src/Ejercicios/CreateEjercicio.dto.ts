import { IsNotEmpty, IsOptional } from 'class-validator';

export class EjercicioDto {
  @IsNotEmpty()
  titulo: string;

  @IsNotEmpty()
  descripcion: string;

  @IsOptional()
  imgUrl: string[];
}
