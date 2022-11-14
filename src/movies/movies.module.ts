import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieToCast } from './movies-to-casts.entity';
import { Movie } from './movies.entity';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { CastsModule } from 'src/casts/casts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie, MovieToCast]),
    forwardRef(() => CastsModule),
  ],
  exports: [TypeOrmModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
