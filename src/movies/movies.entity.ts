import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MovieToCast } from '../movies-to-casts/movies-to-casts.entity';
import { MovieStatus } from './movies.types';
import { Factory } from 'nestjs-seeder';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Factory((faker) => faker.lorem.words(3))
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Factory((faker) => faker.random.locale())
  @Column({ nullable: true, type: 'varchar', length: 30 })
  language?: string;

  @Factory((faker) =>
    faker.helpers.arrayElement([...Object.values(MovieStatus)]),
  )
  @Column({ nullable: true, type: 'enum', enum: MovieStatus })
  status?: MovieStatus;

  @Factory(() => Math.floor(Math.random() * 5))
  @Column({ nullable: true })
  rating?: number;

  @Exclude()
  @OneToMany(() => MovieToCast, (movieToCast) => movieToCast.movie)
  movieToCasts?: MovieToCast[];
}
