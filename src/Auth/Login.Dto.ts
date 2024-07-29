import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class loginDto {
    /**
      * Correo electrónico del usuario
      * @example usuario@ejemplo.com
    */
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Correo electrónico del usuario',
        example: 'usuario@ejemplo.com',
    })
    email: string;

    /**
      * Contraseña del usuario
      * @example Contraseña123!
    */
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'Contraseña123!',
    })
    password: string;
}