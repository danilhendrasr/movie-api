import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieToCast } from './movies-to-casts.entity';
import { Movie } from './movies.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, MovieToCast])],
  exports: [TypeOrmModule],
})
export class MoviesModule {}
