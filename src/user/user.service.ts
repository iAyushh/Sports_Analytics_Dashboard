import { userConfigFactory } from '@Config';
import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { UtilsService } from 'src/common/providers';
import { PrismaService } from 'src/prisma';
import { User, UserRole, UserMeta } from 'generated/prisma/client';
import { ValidatedUser } from 'src/common/types';

@Injectable()
export class UserService {
  constructor(
    @Inject(userConfigFactory.KEY)
    private readonly config: ConfigType<typeof userConfigFactory>,
    private readonly prisma: PrismaService,
    private readonly utilsService: UtilsService,
  ) {}

  async getById(userId: number): Promise<User> {
    return await this.prisma.user.findUniqueOrThrow({
      where: {
        userId: userId,
      },
    });
  }

  async getByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        meta: true,
      },
    });
    return user;
  }

  async getMetaById(userId:number):Promise<UserMeta>{
    return this.prisma.userMeta.findUniqueOrThrow({
      where:{
        userId
      }
    })
  }

  private hashPassword(password: string) {
    const salt = this.utilsService.generateSalt(this.config.passwordSaltLength);
    const hash = this.utilsService.hashPassword(
      password,
      salt,
      this.config.passwordHashLength,
    );
    return { salt, hash };
  }

  async validateCredentials(
    username: string,
    password: string,
  ): Promise<ValidatedUser | false | null> {
    const user = await this.getByUsername(username);
    if (!user) return null;

    const userMeta = await this.getMetaById(user.userId);
    const passwordHash = this.utilsService.hashPassword(
      password,
      userMeta.passwordSalt||'',
      userMeta.passwordHash 
      ? userMeta.passwordHash.length/2
      :this.config.passwordHashLength,
    )

    if(userMeta.passwordHash === passwordHash){
      
      return {
        id: user.userId,
        type: user.userType,
      };
    }
    return false;

  }

  async create(data: {
    username: string;
    password: string;
    userType: UserRole;
    registrationDate: string;
  }): Promise<User> {
    const { salt, hash } = this.hashPassword(data.password);

    return await this.prisma.user.create({
      data: {
        username: data.username,
        userType: data.userType,
        registrationDate: data.registrationDate,
        meta: {
          create: {
            passwordHash: hash,
            passwordSalt: salt,
          },
        },
      },
      include: {
        meta: true,
      },
    });
  }
}
