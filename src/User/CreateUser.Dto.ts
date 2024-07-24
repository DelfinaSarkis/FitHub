import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  @ApiProperty({
    description: 'El nombre del usuario',
    example: 'Juan Gomez',
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'El email del usuario',
    example: 'usuario@ejemplo.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    { message: 'Contraseña no cumple con los requisitos minimos' },
  )
  @ApiProperty({
    description:
      'La contraseña del usuario debe tener al menos: una mayuscula,una minuscula, un numero, un carcater especial. Y debe tener de 8 a 15 digitos',
    example: '12345678aA!',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    { message: 'Contraseña no cumple con los requisitos minimos' },
  )
  @ApiProperty({
    description: 'La contraseña debe coincidir con la anterior',
    example: '12345678aA!',
  })
  passwordConfirm: string;

  @IsNumber()
  @IsInt()
  @Min(1000000000)
  @Max(9999999999)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Numero de telefono celular del usuario, con 10 cifras',
    example: 2664404040,
  })
  phone: number;

  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  @ApiProperty({
    description: 'Pais de residencia del usuario',
    example: 'Argentina',
  })
  pais: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  @ApiProperty({
    description: 'Direccion de residencia del usuario',
    example: 'Calle Falsa 123',
  })
  direccion: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  @ApiProperty({
    description: 'Ciudad de residencia del usuario',
    example: 'San Luis',
  })
  ciudad: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @Length(3, 80)
  @ApiPropertyOptional({
    description: 'El nombre del usuario // Puede ser pasado o no',
    example: 'Juan Gomez',
  })
  name?: string;

  @IsString()
  @IsOptional()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    { message: 'Contraseña no cumple con los requisitos minimos' },
  )
  @ApiPropertyOptional({
    description: 'La contraseña del usuario // Puede ser pasado o no',
    example: '12345678aA!',
  })
  password?: string;

  @IsNumber()
  @IsOptional()
  @IsInt()
  @Min(1000000000)
  @Max(9999999999)
  @ApiPropertyOptional({
    description:
      'Numero de telefono celular del usuario, con 10 cifras // Puede ser pasado o no',
    example: 2664404040,
  })
  phone?: number;

  @IsString()
  @IsOptional()
  @Length(5, 20)
  @ApiPropertyOptional({
    description: 'Pais de residencia del usuario // Puede ser pasado o no',
    example: 'Argentina',
  })
  pais?: string;

  @IsString()
  @IsOptional()
  @Length(3, 100)
  @ApiPropertyOptional({
    description: 'Direccion de residencia del usuario // Puede ser pasado o no',
    example: 'Calle Falsa 123',
  })
  direccion?: string;

  @IsString()
  @IsOptional()
  @Length(5, 20)
  @ApiPropertyOptional({
    description: 'Ciudad de residencia del usuario // Puede ser pasado o no',
    example: 'Villa Mercedes',
  })
  ciudad?: string;
}
