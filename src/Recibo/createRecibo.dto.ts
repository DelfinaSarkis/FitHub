import {
  IsArray,
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { StateRecibo } from './recibo.enum';
import { Users } from 'src/User/User.entity';

export class CreateReciboDto {
  @IsUUID('all')
  @IsNotEmpty()
  userId: string;

  @IsUUID(undefined, { each: true })
  @IsOptional()
  planId: string[];

  @IsUUID(undefined, { each: true })
  @IsOptional()
  rutinaId: string[];

  @IsDecimal()
  @IsOptional()
  price: number;

  @IsEnum(StateRecibo)
  @IsOptional()
  state: StateRecibo;
}
