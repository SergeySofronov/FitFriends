import { registerAs } from '@nestjs/config';

export const frontendUrlOptions = registerAs('frontendUrl', () => ({
  host: process.env.FRONTEND_PRIVATE_URL,
}));
