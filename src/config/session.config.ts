import { registerAs } from '@nestjs/config';

import { join } from 'path';
import { readFileSync } from 'fs';

export default registerAs('session', () => ({
  key: readFileSync(join(__dirname, '..', '..', 'secret_key')),
}));
