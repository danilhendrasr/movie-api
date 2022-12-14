import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cast } from 'src/casts/casts.entity';
import { InvalidPayloadError } from 'src/shared/errors/invalid-payload.error';
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
    if (!('name' in payload)) {
      throw new InvalidPayloadError();
    }

    return await this.moviesRepository.save(payload);
  }

  async updateMovie(id: number, payload: Partial<Movie>) {
    const foundMovie = await this.getOneMovie(id);

    return await this.moviesRepository.save({
      ...foundMovie,
      ...payload,
    });
  }

  async deleteMovie(id: number) {
    await this.getOneMovie(id);
    await this.moviesRepository.delete(id);
  }

  async getCasts(movieId: number) {
    await this.moviesRepository.findOneByOrFail({ id: movieId });
    return await this.castsRepository.find({
      where: { movieToCasts: { movieId } },
      relations: { movieToCasts: true },
    });
  }
}
