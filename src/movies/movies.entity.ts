import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MovieStatus } from './movies.types';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ nullable: true, type: 'varchar', length: 30 })
  language?: string;

  @Column({ nullable: true, type: 'enum', enum: MovieStatus })
  status?: MovieStatus;

  @Column({ nullable: true })
  rating?: number;
}
