import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { EventService } from 'src/event/';
import { PrismaService } from 'src/prisma';
import { UserService } from 'src/user/';
import { CreateBetDto } from './dto/create-bet.dto';
import { NotFoundError } from 'rxjs';
import { BetOutcome } from 'generated/prisma/enums';


@Injectable()
export class BetService {
  constructor(
    private userService: UserService,
    private readonly eventService: EventService,
    private readonly prisma: PrismaService,
  ) {}

  async getAllBets() {
    return await this.prisma.bets.findMany({
      include: {
        user: { select: { username: true } },
        event: { select: { sport: true, status: true } },
      },
    });
  }

  async getById(betId: number) {
    return await this.prisma.bets.findUniqueOrThrow({
      where: {
        betId: betId,
      },
    });
  }
  async getUserbyId(userId: number) {
    return await this.userService.getById(userId);
  }
  async getEventbyId(eventId: number) {
    return await this.eventService.findById(eventId);
  }

  async createBet(userId: number, data: CreateBetDto) {
    const user = await this.getUserbyId(userId);
    const event = await this.eventService.findById(data.eventId);
    if(!event){
        throw new NotFoundException("Event not found.")
    }
    if (event.status !== 'open') {
      throw new BadRequestException('Bets cannot be placed on closed events.');
    }
    const newBet = await this.prisma.bets.create({
      data: {
        userId: user.userId,
        eventId: data.eventId,
        betAmount: data.betAmount,
        betOutcome: data.betOutcome ?? BetOutcome.pending,
      },
    });
    return newBet;
  }
}
