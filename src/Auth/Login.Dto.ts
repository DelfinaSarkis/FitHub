import { IsEmail, IsString } from 'class-validator';

export class loginDto {
  /**
    * El email del usuario
    * @example usuario@ejemplo.com
  */
  @IsEmail()
  email: string;

  /**
    * La contraseña del usuario
    * @example 12345678aA!
  */
  @IsString()
  password: string;
}
