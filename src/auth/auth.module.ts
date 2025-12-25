import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import {  LocalStrategy } from 'src/strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { LOCAL_AUTH } from './auth.constants';;
import { ConfigModule, ConfigService } from '@nestjs/config';
import { forwardRef } from '@nestjs/common';

@Module({
  imports:[ 
    ConfigModule,
    forwardRef(() => UserModule)
, JwtModule.registerAsync({
  imports:[ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: 60 * 60 * 24,
        },
      }),
    }), PassportModule.register({defaultStrategy:LOCAL_AUTH})],
  providers: [AuthService,PrismaService,LocalStrategy],
  controllers: [AuthController],
  exports:[AuthService, PassportModule]
})
export class AuthModule {}
