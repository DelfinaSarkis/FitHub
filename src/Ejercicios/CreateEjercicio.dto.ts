import { IsNotEmpty } from 'class-validator';

export class EjercicioDto {
  /**
    * Título del ejercicio
    * @example "Flexiones de Pecho"
  */
  @IsNotEmpty()
  titulo: string;

  /**
    * Descripción del ejercicio
    * @example "Ejercicio básico para fortalecer los músculos del pecho y los tríceps."
  */
  @IsNotEmpty()
  descripcion: string;

  /**
    * URL de la imagen del ejercicio
    * @example "https://example.com/images/flexiones.jpg"
  */
  imgUrl: string;
}
