import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { UserService } from 'src/user';
import { CreateEventDto, UpdateEventDto } from './dto';

@Injectable()
export class EventService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async getAllEvents() {
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
    const newEvent = await this.prisma.events.create({
      data: {
        userId,
        sport: data.sport,
        eventDate: new Date(data.eventDate),
        status: data.status,
      },
    });
    return newEvent;
  }

  async updateEvent(userId: number, eventId: number, data: UpdateEventDto) {
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
        status:data.status,
      },
    });
    return updatedEvent;
  }

  async deleteEvent(userId: number, eventId: number) {
    const event = await this.findById(eventId);

    if(!event){
      throw new NotFoundException('Event not found.')
    }
    const deletedEvent = await this.prisma.events.delete({
      where: {
        eventId,
      },
    });
    return deletedEvent;
  }
}
