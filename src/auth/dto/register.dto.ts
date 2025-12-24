import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from 'generated/prisma/enums';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  
  @IsString()
  password: string;


  @IsEnum(UserRole)
  userType: UserRole;

  @IsDate()
  registrationDate:string;
}
