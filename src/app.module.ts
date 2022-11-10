import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { CastsModule } from './casts/casts.module';

@Module({
  imports: [MoviesModule, CastsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
