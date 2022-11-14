import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cast } from './casts.entity';
import { CastsController } from './casts.controller';
import { CastsService } from './casts.service';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cast]), forwardRef(() => MoviesModule)],
  exports: [TypeOrmModule],
  controllers: [CastsController],
  providers: [CastsService],
})
export class CastsModule {}
