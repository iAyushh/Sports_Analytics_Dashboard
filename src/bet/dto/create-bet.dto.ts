import { Decimal } from "@prisma/client/runtime/index-browser";
import { IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { BetOutcome } from "generated/prisma/enums";


export class CreateBetDto{
    @IsNumber()
    @IsNotEmpty()
    eventId: number;

    @IsDecimal()
    @IsNotEmpty()
    betAmount:Decimal;

    @IsEnum(BetOutcome)
    @IsOptional()
    betOutcome?: BetOutcome

}