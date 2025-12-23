import { Module } from '@nestjs/common';
import { BetController } from './bet.controller';
import { BetService } from './bet.service';
import { EventService } from 'src/event';
import { PrismaService } from 'src/prisma';
import { UserService } from 'src/user';
import { AuthService } from 'src/auth';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [BetController],
  providers: [JwtService, AuthService,UserService, BetService, EventService, PrismaService],
})
export class BetModule {}
