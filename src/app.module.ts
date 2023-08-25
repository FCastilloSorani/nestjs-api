import { Module } from '@nestjs/common';

// Configuration
import { ConfigModule } from '@nestjs/config';

// Configuration files
import apiConfig from '@config/api.config';
import corsConfig from '@config/cors.config';
import sessionConfig from '@config/session.config';

// Guards
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@auth/guards/auth.guard';

// Modules
import { AuthModule } from '@auth/auth.module';
import { TasksModule } from '@tasks/tasks.module';

// Routing
import { AppRoutingModule } from './app-routing.module';

@Module({
  imports: [
    AppRoutingModule,
    AuthModule,
    ConfigModule.forRoot({ load: [apiConfig, corsConfig, sessionConfig] }),
    TasksModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
