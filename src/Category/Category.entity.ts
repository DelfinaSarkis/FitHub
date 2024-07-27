
import { Rutina } from "src/Rutina/Rutina.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ManyToMany(()=>Rutina,(rutina)=>rutina.category)
  rutinas:Rutina[]
}

