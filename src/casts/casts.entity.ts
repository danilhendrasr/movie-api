import { MovieToCast } from 'src/movies/movies-to-casts.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => MovieToCast, (movieToCast) => movieToCast.cast)
  movieToCasts?: MovieToCast[];
}
