import { Body, Controller, Post } from '@nestjs/common';

// DTOs
import { AuthCredentialsDto } from '../dtos/auth-credentials.dto';

// Services
import { AuthService } from '../services/auth.service';

@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signin(authCredentialsDto);
  }
}
