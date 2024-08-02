import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'Recibos',
})
export class Recibo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column('text', { array: true, nullable: true })
  planId: string[];

  @Column('text', { array: true, nullable: true })
  rutinaId: string[];
}
