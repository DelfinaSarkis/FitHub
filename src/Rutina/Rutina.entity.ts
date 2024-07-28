/* eslint-disable @typescript-eslint/no-unused-vars */
import { Comentarios } from 'src/Comentario/Comentarios.entity';
import { Ejercicio } from 'src/Ejercicios/Ejercicios.entity';
import { Users } from 'src/User/User.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DifficultyLevel } from 'src/PlanDeEntranmiento/difficultyLevel.enum';
import { Categorias } from 'src/Dto/Categorias.Dto';
import { Category } from 'src/Category/Category.entity';

@Entity({
  name: 'rutina',
})
export class Rutina {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'boolean', default: false })
  check: boolean;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' , nullable: true})  
  imageUrl: string;

  @Column({type: 'varchar', length: 100})
  difficultyLevel:DifficultyLevel


  @ManyToMany(() => Ejercicio, (ejercicio) => ejercicio.rutina)
  @JoinTable({ name: 'rutina-ejercicios' })
  exercise: Ejercicio[];

  @ManyToMany(() => Category, (categorias) => categorias.rutinas)
  @JoinTable({ name: 'rutina-categoria' })
  category: Category[];


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
