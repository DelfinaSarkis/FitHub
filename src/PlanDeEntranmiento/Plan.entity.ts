/* eslint-disable @typescript-eslint/no-unused-vars */
import { Categoria } from 'src/Categorias/Categoria.entity';
import { Comentarios } from 'src/Comentario/Comentarios.entity';
import { Suscripciones } from 'src/Suscripciones/Suscripciones.entity';
import { Users } from 'src/User/User.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DifficultyLevel } from './difficultyLevel.enum';
import { Category } from 'src/Category/Category.entity';
import { Recibo } from 'src/Recibo/recibo.entity';

@Entity({ name: 'plan' })
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'boolean', default: false })
  check: boolean;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  location: string;

  @CreateDateColumn()
  date: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'varchar', length: 100 })
  difficultyLevel: DifficultyLevel;

  @ManyToOne(() => Users, (user) => user.planAdmin)
  @JoinColumn({ name: 'admin' })
  admin: Users;

  @OneToMany(() => Comentarios, (comentarios) => comentarios.plan)
  @JoinColumn({ name: 'comentarios' })
  comments: Comentarios[];

  @OneToMany(() => Suscripciones, (suscripcion) => suscripcion.plan)
  subscriptions: Suscripciones[];

  @ManyToMany(() => Category, (category) => category.plan)
  @JoinTable({ name: 'category-plan' })
  category: Category[];

  @ManyToMany(() => Recibo, (recibo) => recibo.planId)
  @JoinTable({ name: 'planes-recibos' })
  recibo: Recibo[];
}
