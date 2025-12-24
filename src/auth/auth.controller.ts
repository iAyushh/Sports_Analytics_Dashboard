import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService, ValidAuthResponse } from './auth.service';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { ValidatedUser } from 'src/common/types';
import { RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request & { user: ValidatedUser }) {
    const { accessToken, type } = await this.authService.login(
      req.user.id,
      req.user.type,
    );
    return { accessToken, type };
  }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const newUser = await this.authService.register({
      username: dto.username,
      password: dto.password,
      userType: dto.userType,
      registrationDate: dto.registrationDate,
    });
    const { accessToken, type } = newUser as ValidAuthResponse;
    return { accessToken, type };
  }
}
