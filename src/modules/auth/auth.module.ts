import { Module } from '@nestjs/common';

// Config
import { jwtConfig } from '@config/jwt.config';

// Controllers
import { AuthController } from './controllers/auth.controller';

// Modules
import { JwtModule } from '@nestjs/jwt';

// Services
import { AuthService } from './services/auth.service';

@Module({
  imports: [JwtModule.register({ ...jwtConfig })],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
