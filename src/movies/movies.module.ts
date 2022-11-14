import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movies.entity';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { CastsModule } from 'src/casts/casts.module';
import { MoviesToCastsModule } from 'src/movies-to-casts/movies-to-casts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    forwardRef(() => CastsModule),
    MoviesToCastsModule,
  ],
  exports: [TypeOrmModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
