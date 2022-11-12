import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieToCast } from './movies-to-casts.entity';
import { Movie } from './movies.entity';
import { MoviesController } from './movies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, MovieToCast])],
  exports: [TypeOrmModule],
  controllers: [MoviesController],
})
export class MoviesModule {}
