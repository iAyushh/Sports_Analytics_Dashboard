import { IsEnum, IsOptional, IsString } from "class-validator";
import { EventStatus } from "generated/prisma/enums";


export class UpdateEventDto{
    @IsOptional()
    @IsString()
    sport?:string;
    

    @IsOptional()
    @IsString()
    eventDate?:string;

    @IsOptional()
    @IsEnum(EventStatus)
    status?:EventStatus
}