import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { UserRole } from './User.enum';

export class CreateEntrenadorDto {
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

  @IsEnum(UserRole)
  @ApiProperty({
    description: 'Rol del usuario',
    example: UserRole.ENTRENADOR,
  })
  isAdmin: UserRole.ENTRENADOR;

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
