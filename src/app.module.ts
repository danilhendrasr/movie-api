import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { CastsModule } from './casts/casts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envKeys, EnvTypes } from './shared/constants';
import { HealthModule } from './health/health.module';
import { MoviesToCastsModule } from './movies-to-casts/movies-to-casts.module';

@Module({
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
          logging: true,
          synchronize:
            configService.get<EnvTypes>(envKeys.envType) !== EnvTypes.PROD
              ? true
              : false,
        };
      },
    }),
    MoviesModule,
    CastsModule,
    HealthModule,
    MoviesToCastsModule,
  ],
})
export class AppModule {}
