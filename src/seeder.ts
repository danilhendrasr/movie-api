import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { CastsModule } from './casts/casts.module';
import { CastsSeeder } from './casts/casts.seeder';
import { MoviesToCastsSeeder } from './movies/movies-to-casts.seeder';
import { MoviesModule } from './movies/movies.module';
import { MoviesSeeder } from './movies/movies.seeder';
import { envKeys } from './shared/constants';

seeder({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get(envKeys.db.host),
          port: +configService.get(envKeys.db.port),
          username: configService.get(envKeys.db.username),
          password: configService.get(envKeys.db.password),
          database: configService.get(envKeys.db.name),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    MoviesModule,
    CastsModule,
  ],
}).run([MoviesSeeder, CastsSeeder, MoviesToCastsSeeder]);
