import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BetModule } from './bet/bet.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { jwtConfigFactory } from '@Config';

import { AdminModule } from './admin/admin.module';
import { EventModule } from './event/event.module';
import { AnalyticsModule } from './analytics/analytics.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfigFactory],
    }),
    BetModule,
    UserModule,
    AuthModule,
    AdminModule,
    EventModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
