import { Decimal } from "@prisma/client/runtime/index-browser";
import { IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive } from "class-validator";
import { BetOutcome } from "generated/prisma/enums";


export class CreateBetDto{
    @IsNumber()
    @IsNotEmpty()
    eventId: number;

    @IsNumber()
    @IsPositive()
    betAmount:number;

    @IsEnum(BetOutcome)
    @IsOptional()
    betOutcome?: BetOutcome

}