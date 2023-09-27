import type { Config } from './config.interface';

const config: Config = {
  nest: {
    port: 3000,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Nestjs FTW',
    description: 'The nestjs API description',
    version: '1.5',
    path: 'api',
  },

  security: {
    expiresIn: '2m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
    jwtSecret: '1234565432123456',
  },
  redis: {
    url: 'redis://localhost:6379',
    host: 'localhost',
    port: 6379,
    db: 0,
  },
};

export default (): Config => config;
