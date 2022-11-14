export const envKeys = {
  envType: 'ENV',
  db: {
    host: 'DB_HOST',
    port: 'DB_PORT',
    username: 'DB_USERNAME',
    password: 'DB_PASSWORD',
    name: 'DB_NAME',
  },
} as const;

export enum EnvTypes {
  DEV = 'DEV',
  PROD = 'PROD',
}
