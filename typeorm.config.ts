import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { envKeys } from './src/shared/constants';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get(envKeys.db.host),
  port: +configService.get(envKeys.db.port),
  username: configService.get(envKeys.db.username),
  password: configService.get(envKeys.db.password),
  database: configService.get(envKeys.db.name),
  entities: ['dist/**/*.entity.js'],
  migrations: ['migrations/*.ts'],
});
