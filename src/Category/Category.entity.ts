
import { UUID } from "crypto";
import { Plan } from "src/PlanDeEntranmiento/Plan.entity";

import { Rutina } from "src/Rutina/Rutina.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique:true })
  name: string;

  @ManyToMany(() => Rutina, (rutina) => rutina.category)
  rutinas: Rutina[];

  @ManyToMany(()=>Plan, (plan) => plan.category)
  plan:Plan[]
}

