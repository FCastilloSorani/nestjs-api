import { Injectable, NotFoundException } from '@nestjs/common';

// DTOs
import { AuthCredentialsDto } from '../dtos/auth-credentials.dto';

// Models
import { JwtPayload } from '../models/jwt-payload.model';
import { User } from '../models/user.model';

// Services
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      id: 1,
      username: 'maria',
      password: 'guess',
    },
  ];

  constructor(private readonly jwtService: JwtService) {}

  async signin(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;

    const found = this.users.find(
      (e: User) => e.username === username && e.password === password,
    );

    if (!found) throw new NotFoundException();

    const payload: JwtPayload = {
      username,
      sub: found.id,
    };

    return this.jwtService.sign(payload);
  }
}
