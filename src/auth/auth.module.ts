import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import {  LocalStrategy } from 'src/strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { LOCAL_AUTH } from './auth.constants';

@Module({
  imports:[UserModule, JwtModule.register({
    secret:process.env.JWT_SECRET,
    signOptions:{expiresIn:'1d'}
  }), PassportModule.register({defaultStrategy:LOCAL_AUTH})],
  providers: [AuthService,PrismaService,LocalStrategy],
  controllers: [AuthController],
  exports:[AuthService, PassportModule]
})
export class AuthModule {}
