import { Module } from '@nestjs/common';

// Config
import { jwtConfig } from '@config/jwt.config';
import { passportConfig } from '@config/passport.config';

// Controllers
import { AuthController } from './controllers/auth.controller';

// Modules
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// Services
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    JwtModule.register({ ...jwtConfig }),
    PassportModule.register(passportConfig),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
