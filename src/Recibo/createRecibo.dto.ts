import { IsNumber, IsString, IsUUID } from 'class-validator';
import { StateRecibo } from './recibo.enum';
import { Users } from 'src/User/User.entity';
import { Rutina } from 'src/Rutina/Rutina.entity';
import { Plan } from 'src/PlanDeEntranmiento/Plan.entity';

export class CreateReciboDto {
  @IsUUID()
  user: Users;

  @IsUUID()
  rutinas: Rutina[];

  @IsUUID()
  planes: Plan[];

  @IsNumber()
  price: number;

  @IsString()
  state: StateRecibo;
}