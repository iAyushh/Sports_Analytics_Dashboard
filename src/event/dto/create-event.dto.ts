import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { EventStatus } from 'generated/prisma/enums';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  sport:string;

  @IsString()
  @IsNotEmpty()
  eventDate:string;

  @IsEnum(EventStatus)
  @IsNotEmpty()
  status: EventStatus;


}
