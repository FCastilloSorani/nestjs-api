import { registerAs } from '@nestjs/config';

const { env } = process;

export default registerAs('api', () => ({
  port: env.PORT ? parseInt(env.PORT, 10) : 3001,
}));
