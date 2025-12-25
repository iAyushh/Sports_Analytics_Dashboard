import { JwtAuthGuard,RolesGuard,AccessGuard } from 'src/common/guards';
import { Get,Param,Post,Req,Body } from '@nestjs/common';
import { UseGuards,Controller } from '@nestjs/common';
import { Roles } from 'src/common/decorators';
import { BetService } from './bet.service';
import { UserRole } from 'generated/prisma/enums';
import { CreateBetDto } from './dto/create-bet.dto';

@Roles(UserRole.admin, UserRole.master, UserRole.player)
@UseGuards(JwtAuthGuard, RolesGuard, AccessGuard)
@Controller('bet')
export class BetController {
  constructor(private readonly betService: BetService) {}

  @Get()
  getAllBets() {
    return this.betService.getAllBets();
  }

  @Get(':id')
  getBetsById(@Param('id') id: string) {
    return this.betService.getById(Number(id));
  }

  @Post()
  createBet(@Req() req: any, @Body() dto: CreateBetDto) {
    return this.betService.createBet(req.user.id, dto);
  }
}
