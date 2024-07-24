import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from './User.enum';
import { Comentarios } from 'src/Comentario/Comentarios.entity';
import { Suscripciones } from 'src/Suscripciones/Suscripciones.entity';
import { Rutina } from 'src/Rutina/Rutina.entity';
import { Plan } from 'src/PlanDeEntranmiento/Plan.entity';
import {v4 as uuid} from 'uuid';

  
  @Entity({
    name: 'users',
  })
  export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @Column({ type: 'varchar', unique: true, length: 100, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    password: string;

    @Column({ type: 'bigint', unique: true })
    dni: number;

    @Column({ type: 'bigint' })
    phone: number;

    @Column({ type: 'varchar', length: 100 })
    country: string;

    @Column({ type: 'varchar', length: 100 })
    address: string;

    @Column({ type: 'varchar', length: 100 })
    city: string;

    @Column({ default: UserRole.USER })
    role: UserRole;

    @ManyToMany(() => Rutina, (rutina) => rutina.users)
    @JoinTable({ name: 'usuario-rutina' })
    routine: Rutina[];

    @OneToMany(() => Suscripciones, (suscripcion) => suscripcion.user)
    @JoinColumn({ name: 'suscripciones' })
    subsciption: Suscripciones[];

    @OneToMany(() => Rutina, (rutina) => rutina.admin)
    @JoinTable({ name: 'admin-rutina' })
    routineAdmin: Rutina[];

    @OneToMany(() => Plan, (planes) => planes.admin)
    @JoinTable({ name: 'admin-plan' })
    planAdmin: Plan[];

    @OneToMany(() => Comentarios, (comentario) => comentario.user)
    @JoinColumn({ name: 'comentarios' })
    comments: Comentarios[];

    @Column({ default: false })
    delete: boolean;

    @Column({ default: true })
    isActive: boolean;
    }
