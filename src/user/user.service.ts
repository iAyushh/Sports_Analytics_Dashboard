import { userConfigFactory } from '@Config';
import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { UtilsService } from 'src/common/providers';
import { PrismaService } from 'src/prisma';
import { User } from 'generated/prisma/client';

@Injectable()
export class UserService {
  constructor(
    @Inject(userConfigFactory.KEY)
    private readonly config: ConfigType<typeof userConfigFactory>,
    private readonly prisma: PrismaService,
    private readonly utilsService: UtilsService,
  ) {}

  private hashPassword(password: string): { salt: string; hash: string } {
    const salt = this.utilsService.generateSalt(this.config.passwordSaltLength);
    const hash = this.utilsService.hashPassword(
        password,
        salt,
        this.config.passwordHashLength
    );
    return {salt,hash}
  }

  async create(data:{
    username:string,
    userType:string,
    registrationDate:Date,
  }):Promise<User>{
    return await this.prisma.user.create({
        data:{
            username: data.username
            
        }
    })
  
  }
}
