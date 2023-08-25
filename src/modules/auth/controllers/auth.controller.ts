import { Body, Controller, Post } from '@nestjs/common';

// Decorators
import { Public } from '@auth/decorators/public.decorator';

// DTOs
import { AuthCredentialsDto } from '../dtos/auth-credentials.dto';

// Services
import { AuthService } from '../services/auth.service';

@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signin')
  async signin(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    return this.authService.signin(authCredentialsDto);
  }
}
