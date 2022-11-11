import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { CastsModule } from './casts/casts.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [MoviesModule, CastsModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
