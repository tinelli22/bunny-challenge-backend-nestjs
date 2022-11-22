import type { Config } from './config.interface';

const config: Config = {
  nest: {
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'API Dermato Virtual',
    description: 'API Dermato Virtual NestJS',
    version: '1.5',
    path: 'api',
  },
  security: {
    expiresIn: '2m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
  },
};

export default (): Config => config;
