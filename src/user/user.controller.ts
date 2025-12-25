import {
  Controller,
  Get,
  Param,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AccessGuard, JwtAuthGuard } from '../common/guards';
import { RolesGuard } from '../common/guards';
import { Roles } from '../common/decorators';
import { UserRole } from 'generated/prisma/enums';
import type { AuthenticatedRequest } from 'src/common/types';


@UseGuards(JwtAuthGuard, RolesGuard, AccessGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  
  @Get('me')
async getMyProfile(@Req() req: AuthenticatedRequest) {
  return this.userService.getById(req.user.id);
}

  
  @Roles(UserRole.admin)
  @UseGuards(RolesGuard)
  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.getById(id);
  }
}
