import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import {  LocalStrategy } from 'src/strategies/local.strategy';

@Module({
  imports:[UserModule, JwtModule.register({
    secret:process.env.JWT_SECRET,
    signOptions:{expiresIn:'1d'}
  }),],
  providers: [AuthService,PrismaService,LocalStrategy],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {}
