import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { AccessGuard, JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { EventService } from './event.service';
import { CreateEventDto, UpdateEventDto } from './dto';
import { Roles } from 'src/common/decorators';
import { UserRole } from 'generated/prisma/enums';
import type { AuthenticatedRequest } from 'src/common/types';

@UseGuards(JwtAuthGuard, AccessGuard,  RolesGuard)
@Roles(UserRole.admin, UserRole.master)
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @Get()
  getAllEvents() {
    return this.eventService.getAllEvents();
  }
  @Get(':id')
  getEventById(@Param('id') eventId: string) {
    return this.eventService.findById(Number(eventId));
  }

  @Post()
  createEvent(@Body() dto: CreateEventDto, @Req() req: AuthenticatedRequest) {
    return this.eventService.addEvent(req.user.id, dto);
  }

  @Patch(':id')
  updateEvent(
    @Param('id') eventId: string,
    @Body() dto: UpdateEventDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.id;
    return this.eventService.updateEvent(userId, Number(eventId), dto);
  }

  @Delete(':eventId')
  deleteEvent(
    @Param('eventId') eventId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.id;
    return this.eventService.deleteEvent(userId, Number(eventId));
  }
}
