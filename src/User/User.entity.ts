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

  
  @Entity({
    name: 'users',
  })
  export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    password: string;

    @Column({ type: 'bigint' })
    phone: number;

    @Column({ default: UserRole.USER })
    isAdmin: UserRole;

    @Column({ type: 'varchar', length: 100 })
    pais: string;

    @Column({ type: 'varchar', length: 100 })
    direccion: string;

    @Column({ type: 'varchar', length: 100 })
    ciudad: string;

    @ManyToMany(() => Rutina, (rutina) => rutina.users)
    @JoinTable({ name: 'usuario-rutina' })
    rutina: Rutina[];

    @OneToMany(() => Suscripciones, (suscripcion) => suscripcion.user)
    @JoinColumn({ name: 'suscripciones' })
    suscripciones: Suscripciones[];

    @OneToMany(() => Rutina, (rutina) => rutina.admin)
    @JoinTable({ name: 'admin-rutina' })
    rutinaAdmin: Rutina[];

    @OneToMany(() => Plan, (planes) => planes.admin)
    @JoinTable({ name: 'admin-planes' })
    planesAdmin: Plan[];

    @OneToMany(() => Comentarios, (comentario) => comentario.usario)
    @JoinColumn({ name: 'comentarios' })
    comentarios: Comentarios[];

    @Column({ default: true })
    active: boolean;
    }
  }
