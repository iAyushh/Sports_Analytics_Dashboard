import { userConfigFactory } from '@Config';
import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { UtilsService } from 'src/common/providers';
import { PrismaService } from 'src/prisma';
import { User, UserRole } from 'generated/prisma/client';
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
    return await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  

  // async isUsernameExist(
  //   usrname:string,
  //   excludeUserId?:number,
  // ):Promise<boolean>{
  //   return await this.prisma.user.count({
  //     where:{

  //     }
  //   })
  // }

  private hashPassword(password: string): { salt: string; hash: string } {
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

    const { hash } = this.hashPassword(password);
    if (user.password !== hash) {
      return false;
    }

    return {
      id: user.userId,
      type: user.userType,
    };
  }

  async create(data: {
    username: string;
    password: string;
    userType: UserRole;
    registrationDate: string;
  }): Promise<User> {
    let passwordSalt: string ;
    let passwordHash: string ;

    if (data.password) {
      const { salt, hash } = this.hashPassword(data.password);
      passwordSalt = salt;
      passwordHash = hash;
    }
    return await this.prisma.user.create({
      data: {
        username: data.username,
        userType: data.userType,
        password:  data.password ,
        registrationDate:data.registrationDate,
        
      },
    });
  }
}
