import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cast } from 'src/casts/casts.entity';
import { Repository } from 'typeorm';
import { Movie } from './movies.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private moviesRepository: Repository<Movie>,
    @InjectRepository(Cast) private castsRepository: Repository<Cast>,
  ) {}

  async getAllMovies() {
    const movies = await this.moviesRepository.find();
    return movies;
  }

  async getOneMovie(id: number) {
    const movie = await this.moviesRepository.findOneByOrFail({ id });
    return movie;
  }

  async createNewMovie(payload: Omit<Movie, 'id' | 'movieToCasts'>) {
    const movie = await this.moviesRepository.insert(payload);
    return movie;
  }

  async updateMovie(id: number, payload: Partial<Movie>) {
    await this.moviesRepository.findOneByOrFail({ id });

    const movie = await this.moviesRepository.update(id, payload);
    return movie;
  }

  async deleteMovie(id: number) {
    await this.moviesRepository.findOneByOrFail({ id });

    try {
      await this.moviesRepository.delete(id);
    } catch (e) {
      return Promise.reject(new Error('Failed deleting from database.'));
    }
  }

  async getMovieCasts(movieId: number) {
    await this.moviesRepository.findOneByOrFail({ id: movieId });
    return await this.castsRepository.find({
      where: { movieToCasts: { movieId } },
      relations: { movieToCasts: true },
    });
  }
}