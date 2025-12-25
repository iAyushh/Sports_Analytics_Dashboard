import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth';


@Module({
  imports:[PrismaModule,CommonModule,AuthModule ],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
