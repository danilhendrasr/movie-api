import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieToCast } from './movies-to-casts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieToCast])],
  exports: [TypeOrmModule],
})
export class MoviesToCastsModule {}
