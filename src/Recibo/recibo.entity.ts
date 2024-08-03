import { Users } from 'src/User/User.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
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

  @Column()
  state: StateRecibo;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Users, (user) => user.recibos)
  @JoinColumn({ name: 'recibos' })
  userId: Users;

  @ManyToMany(() => Plan, (plan) => plan.recibo)
  planId: Plan[];

  @ManyToMany(() => Rutina, (rutina) => rutina.recibo)
  rutinaId: Rutina[];
}
