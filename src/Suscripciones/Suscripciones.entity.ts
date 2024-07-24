import { Plan } from 'src/PlanDeEntranmiento/Plan.entity';
import { Users } from 'src/User/User.entity';
import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'suscripciones',
})
export class Suscripciones {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @UpdateDateColumn()
  date: Date;

  @ManyToOne(() => Plan, (plan) => plan.suscripciones)
  @JoinColumn({ name: 'plan' })
  plan: Plan;

  @ManyToOne(() => Users, (user) => user.suscripciones)
  @JoinColumn({ name: 'usuario' })
  user: Users;
}
