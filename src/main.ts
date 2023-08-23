import { NestFactory } from '@nestjs/core';

// Fastify
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

// Middlewares
import compression from '@fastify/compress';
import cors from '@fastify/cors';
import csrf from '@fastify/csrf-protection';
import helmet from '@fastify/helmet';
import secureSession from '@fastify/secure-session';

// Modules
import { AppModule } from './app.module';

// Services
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Configuration
  const configService = app.get(ConfigService);
  const port = configService.get('api.port');

  const corsConfig = configService.get('cors');
  const sessionConfig = configService.get('session');

  // Middlewares
  await app.register(compression);
  await app.register(cors, corsConfig);
  await app.register(csrf);
  await app.register(helmet);
  await app.register(secureSession, sessionConfig);

  // Validation Pipe
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, '0.0.0.0');
}
bootstrap();
