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
  verificado: boolean;

  @Column({ type: 'varchar', length: 100 })
  categoria: RutinaCategoria[];

  @OneToMany(() => Ejercicio, (ejercicio) => ejercicio.rutina)
  @JoinColumn({ name: 'ejercicios' })
  ejercicios: Ejercicio[];

  @ManyToOne(() => Users, (user) => user.rutinaAdmin)
  @JoinColumn({ name: 'admin' })
  admin: Users;

  @ManyToMany(() => Users, (user) => user.rutina)
  users: Users[];

  @OneToMany(() => Comentarios, (comentario) => comentario.rutina)
  @JoinColumn({ name: 'comentarios' })
  comentarios: Comentarios[];

  @Column({ default: true })
  active: boolean;
}
