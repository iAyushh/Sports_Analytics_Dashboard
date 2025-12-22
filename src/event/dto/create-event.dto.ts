import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEventDto {
  @IsNumber()
  @IsNotEmpty()
  evenId: number;

  

}
