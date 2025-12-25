import { registerAs } from '@nestjs/config';

export const jwtConfigFactory = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET as string,
    expiresIn: 60*60*24 ,
}));
