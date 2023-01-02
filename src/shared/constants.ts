import { EntityNotFoundExceptionFilter } from './filters/entity-not-found-exception.filter';
import { InvalidPayloadExceptionFilter } from './filters/invalid-payload.filter';

export const envKeys = {
  envType: 'NODE_ENV',
  db: {
    host: 'DB_HOST',
    port: 'DB_PORT',
    username: 'DB_USERNAME',
    password: 'DB_PASSWORD',
    name: 'DB_NAME',
  },
} as const;

export enum EnvTypes {
  DEV = 'development',
  PROD = 'production',
}

export const globalFilters = [
  new EntityNotFoundExceptionFilter(),
  new InvalidPayloadExceptionFilter(),
];
