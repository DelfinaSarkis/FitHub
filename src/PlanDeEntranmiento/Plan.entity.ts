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

@Entity({ name: 'plan' })
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: false })
  verificado: boolean;

  @Column({ type: 'boolean' })
  @OneToMany(() => Ejercicio, (ejercicio) => ejercicio.plan)
  @JoinColumn({ name: 'ejercicios' })
  ejercicios: Ejercicio[];

  @ManyToOne(() => Users, (user) => user.planesAdmin)
  @JoinColumn({ name: 'admin' })
  admin: Users;

  @OneToMany(() => Comentarios, (comentarios) => comentarios.plan)
  @JoinColumn({ name: 'comentarios' })
  comentarios: Comentarios[];

  @OneToMany(() => Suscripciones, (suscripcion) => suscripcion.plan)
  suscripciones: Suscripciones[];

  @Column({ default: true })
  active: boolean;
}
