import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BetModule } from './bet/bet.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PlayerModule } from './player/player.module';
import { MasterModule } from './master/master.module';
import { AdminModule } from './admin/admin.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [BetModule, UserModule, AuthModule, PlayerModule, MasterModule, AdminModule, EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
