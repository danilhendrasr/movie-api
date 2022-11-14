import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Movie } from './movies.entity';

@Injectable()
export class MoviesSeeder implements Seeder {
  constructor(
    @InjectRepository(Movie) private readonly movies: Repository<Movie>,
  ) {}

  async seed(): Promise<any> {
    const movies = DataFactory.createForClass(Movie).generate(10);
    return this.movies.save(movies);
  }

  async drop(): Promise<any> {
    return this.movies.delete({});
  }
}
