import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

// Config
import { jwtConfig } from '@config/jwt.config';

// Decorators
import { IS_PUBLIC_KEY } from '@auth/decorators/public.decorator';

// Fastify
import { FastifyRequest } from 'fastify';

// Models
import { JwtPayload } from '../models/jwt-payload.model';
import { User } from '@auth/models/user.model';

// Reflector
import { Reflector } from '@nestjs/core';

// Services
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
        secret: jwtConfig.secret,
      });

      const user: User = {
        id: payload.sub,
        username: payload.username,
      };

      request['user'] = user;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: FastifyRequest): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
