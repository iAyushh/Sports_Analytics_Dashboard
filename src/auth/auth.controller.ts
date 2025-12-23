import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';;
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { ValidatedUser } from 'src/common/types';
import { RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
 
  ) {}
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req:Request & {user: ValidatedUser}) {
    const{accessToken,type}= await this.authService.login(
        req.user.id,
        req.user.type 
    )
    return {accessToken,type}
  }

//   @Post('register')
//   async register(@Body() data:RegisterDto){
//     const user = await this.authService.register(
    
//     )
//   }

  
}
