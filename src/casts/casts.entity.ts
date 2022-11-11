import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cast {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ nullable: true, type: 'date' })
  birthday?: Date;

  @Column({ nullable: true })
  deathDay?: Date;

  @Column({ nullable: true })
  rating?: number;
}
