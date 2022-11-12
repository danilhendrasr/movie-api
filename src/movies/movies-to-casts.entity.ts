import { Cast } from 'src/casts/casts.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Movie } from './movies.entity';

@Entity()
export class MovieToCast {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column()
  movieId: number;

  @Column()
  castId: number;

  @ManyToOne(() => Movie, (movie) => movie.movieToCasts)
  movie: Movie;

  @ManyToOne(() => Cast, (cast) => cast.movieToCasts)
  cast: Cast;
}
