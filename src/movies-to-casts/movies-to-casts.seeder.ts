import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Cast } from 'src/casts/casts.entity';
import { Movie } from 'src/movies/movies.entity';
import { Repository } from 'typeorm';
import { MovieToCast } from './movies-to-casts.entity';

@Injectable()
export class MoviesToCastsSeeder implements Seeder {
  constructor(
    @InjectRepository(Movie) private readonly movies: Repository<Movie>,
    @InjectRepository(Cast) private readonly casts: Repository<Cast>,
    @InjectRepository(MovieToCast)
    private readonly moviesToCasts: Repository<MovieToCast>,
  ) {}

  async seed(): Promise<any> {
    const movies = await this.movies.find();
    const casts = await this.casts.find();
    const moviesToCasts: Partial<MovieToCast>[] = [];

    for (const cast of casts) {
      const randomMovieIdx = Math.floor(Math.random() * movies.length);
      const movie = movies[randomMovieIdx];
      moviesToCasts.push({
        castId: cast.id,
        movieId: movie.id,
      });
    }

    return this.moviesToCasts.save(moviesToCasts);
  }

  async drop(): Promise<any> {
    return this.moviesToCasts.delete({});
  }
}
