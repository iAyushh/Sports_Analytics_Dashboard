import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { PrismaModule } from 'src/prisma';
import { UserModule } from 'src/user';
import { AuthModule } from 'src/auth';
;

@Module({
  imports:[PrismaModule,UserModule,AuthModule],
  providers: [EventService,],
  controllers: [EventController],
  exports:[EventService]
  
})
export class EventModule {}
