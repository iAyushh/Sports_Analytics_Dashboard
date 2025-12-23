import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { UserService } from 'src/user';
import { CreateEventDto, UpdateEventDto } from './dto';

@Injectable()
export class EventService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async getAllEvents(){
    return await this.prisma.events.findMany();
  }
  async findById(eventId: number) {
    return await this.prisma.events.findUniqueOrThrow({
      where: {
        eventId,
      },
    });
  }

  async addEvent(userId: number, data: CreateEventDto) {
    const user = await this.userService.getById(userId);

    const newEvent = await this.prisma.events.create({
      data: {
        userId,
        sport: data.sport,
        eventDate: data.eventDate,
        status: data.status,
      },
    });
    return newEvent;
  }

  async updateEvent(userId: number, eventId: number, data: UpdateEventDto) {
    const user = await this.userService.getById(userId);
    const event = await this.findById(eventId);

    if (userId !== event.userId) {
      throw new ForbiddenException('Not Allowed!');
    }
    const updatedEvent = await this.prisma.events.update({
      where: {
        eventId,
      },
      data: {
        sport: data.sport,
        eventDate: data.eventDate,
      },
    });
    return updatedEvent;
  }

  async deleteEvent(userId: number, eventId: number) {
    const user = await this.userService.getById(userId);
    const event = await this.findById(eventId);

    if (userId !== event.userId) {
      throw new ForbiddenException('Not Allowed!');
    }
    const deletedEvent = await this.prisma.events.delete({
      where: {
        eventId,
      },
    });
    return deletedEvent;
  }
}
