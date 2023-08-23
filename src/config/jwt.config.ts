import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  secret: '371276fa08d71f941601f179b77f389422339a89bf0e79b5e3392bfcac02061e',
  signOptions: {
    expiresIn: '1h',
  },
};
