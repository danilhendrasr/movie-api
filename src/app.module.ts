import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { CastsModule } from './casts/casts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envKeys, EnvTypes } from './constants';

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
          synchronize:
            configService.get<EnvTypes>(envKeys.envType) === EnvTypes.DEV
              ? true
              : false,
        };
      },
    }),
    MoviesModule,
    CastsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
