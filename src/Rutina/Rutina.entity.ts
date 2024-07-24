import { Comentarios } from 'src/Comentario/Comentarios.entity';
import { Ejercicio } from 'src/Ejercicios/Ejercicios.entity';
import { Users } from 'src/User/User.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RutinaCategoria } from './Rutina.enum';

@Entity({
  name: 'rutina',
})
export class Rutina {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: false })
  check: boolean;

  @Column({ type: 'varchar', length: 100 })
  category: RutinaCategoria[];

  @Column({ type: 'varchar' })
  description: string;

  @OneToMany(() => Ejercicio, (ejercicio) => ejercicio.rutina)
  @JoinColumn({ name: 'ejercicios' })
  exercise: Ejercicio[];

  @ManyToOne(() => Users, (user) => user.routineAdmin)
  @JoinColumn({ name: 'admin' })
  admin: Users;

  @ManyToMany(() => Users, (user) => user.routine)
  users: Users[];

  @OneToMany(() => Comentarios, (comentario) => comentario.routine)
  @JoinColumn({ name: 'comentarios' })
  comments: Comentarios[];

  @Column({ default: true })
  isActive: boolean;
}
