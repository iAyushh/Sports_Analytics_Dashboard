import { IsNotEmpty, IsNumber } from "class-validator";


export class CreateBetDto{
    @IsNumber()
    @IsNotEmpty()
    eventId: number;

    @IsNumber()
    @IsNotEmpty()
    betAmount: number;

}