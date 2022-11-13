import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movies.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private moviesRepository: Repository<Movie>,
  ) {}

  async get() {
    const movies = await this.moviesRepository.find();
    return movies;
  }

  async getOne(id: number) {
    const movie = await this.moviesRepository.findOneByOrFail({ id });
    return movie;
  }

  async createNew(payload: Partial<Movie>) {
    const movie = await this.moviesRepository.insert(payload);
    return movie;
  }

  async update(id: number, payload: Partial<Movie>) {
    const movie = await this.moviesRepository.update(id, payload);
    return movie;
  }

  async delete(id: number) {
    try {
      await this.moviesRepository.findOneByOrFail({ id });
    } catch (e) {
      throw new NotFoundException();
    }

    try {
      await this.moviesRepository.delete(id);
    } catch (e) {
      return Promise.reject(new Error('Failed deleting from database.'));
    }
  }
}
