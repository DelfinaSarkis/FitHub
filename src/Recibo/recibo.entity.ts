import { Users } from 'src/User/User.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StateRecibo } from './recibo.enum';
import { Plan } from 'src/PlanDeEntranmiento/Plan.entity';
import { Rutina } from 'src/Rutina/Rutina.entity';

@Entity({
  name: 'Recibos',
})
export class Recibo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: StateRecibo })
  state: StateRecibo;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Users, (user) => user.recibos)
  @JoinColumn({ name: 'userId' })
  user: Users;

  @OneToOne(() => Plan, (plan) => plan.recibo, { nullable: true })
  @JoinColumn({ name: 'recibo_plan' })
  plan: Plan;

  @OneToOne(() => Rutina, (rutina) => rutina.recibo, { nullable: true })
  @JoinColumn({ name: 'recibo_rutina' })
  rutina: Rutina;
}
