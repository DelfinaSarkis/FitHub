import { Plan } from 'src/PlanDeEntranmiento/Plan.entity';
import { Rutina } from 'src/Rutina/Rutina.entity';
import { Users } from 'src/User/User.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'Comentarios',
})
export class Comentarios {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  contenido: string;

  @ManyToOne(() => Users, (usuario) => usuario.comentarios)
  @JoinColumn({ name: 'usurio' })
  usario: Users;

  @ManyToOne(() => Rutina, (rutina) => rutina.comentarios, { nullable: true })
  @JoinColumn({ name: 'rutina' })
  rutina: Rutina;

  @ManyToOne(() => Plan, (plan) => plan.comentarios, { nullable: true })
  @JoinColumn({ name: 'plan' })
  plan: Plan;
}
