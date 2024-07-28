
import { IsNotEmpty } from 'class-validator';

export class EjercicioDto {
  @IsNotEmpty()
  titulo: string;

  @IsNotEmpty()
  descripcion: string;
}
