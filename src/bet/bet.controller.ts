import { Controller, Get, UseGuards } from '@nestjs/common';
import { BetService } from './bet.service';
import { AccessGuard, RolesGuard } from 'src/common/guards';
import { Roles } from 'src/common/decorators';
import { UserRole } from 'generated/prisma/enums';


@Roles(UserRole.admin,UserRole.master)
@UseGuards(RolesGuard,AccessGuard)
@Controller('bet')
export class BetController {
  constructor(
    private readonly betService: BetService,
  ) {}

  @Get()
  getAllBets() {
    return this.betService.getAllBets();
  }
  @Get(":id")
  getBetsById(betId:number){
    return this.betService.getById(betId)
  }
}
