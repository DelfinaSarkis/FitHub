import { Comentarios } from 'src/Comentario/Comentarios.entity';
import { Ejercicio } from 'src/Ejercicios/Ejercicios.entity';
import { Suscripciones } from 'src/Suscripciones/Suscripciones.entity';
import { Users } from 'src/User/User.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DifficultyLevel } from './difficultyLevel.enum';

@Entity({ name: 'plan' })
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'boolean', default: false })
  check: boolean;

  @Column()
  category: string;


  @Column({ type: 'varchar' })
  description: string;

  @Column()
  location: string;

  @Column()
  date: Date;
  
  @Column({ default: true })
  isActive: boolean;

  @Column({type: 'varchar', length: 100})
  difficultyLevel:DifficultyLevel

  //@Column({ type: 'boolean' })
  //@OneToMany(() => Ejercicio, (ejercicio) => ejercicio.plan)
  //@JoinColumn({ name: 'ejercicios' })
  //exercise: Ejercicio[];

  @ManyToOne(() => Users, (user) => user.planAdmin)
  @JoinColumn({ name: 'admin' })
  admin: Users;

  @OneToMany(() => Comentarios, (comentarios) => comentarios.plan)
  @JoinColumn({ name: 'comentarios' })
  comments: Comentarios[];

  @OneToMany(() => Suscripciones, (suscripcion) => suscripcion.plan)
  subscriptions: Suscripciones[];
}
