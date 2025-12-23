import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { UserRole } from 'generated/prisma/enums';
import { JwtPayload } from 'src/common/types';
import { UserService } from 'src/user/user.service';

export type ValidAuthResponse = {
  accessToken: string;
  type: UserRole;
};
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtservice: JwtService,
    private readonly userService: UserService,
  ) {}

  private generateJwt(payload: JwtPayload, options?: JwtSignOptions): string {
    return this.jwtservice.sign(payload, options);
  }

  async login(userId: number, type: UserRole): Promise<ValidAuthResponse> {
    return {
      accessToken: this.generateJwt({
        sub: userId,
        type,
      }),
      type,
    };
  }

  async register(data: {
    username: string;
    password: string;
    userType: UserRole;
    registrationDate: string;
  }): Promise<ValidAuthResponse> {
    const user = await this.userService.create({
      username: data.username,
      password: data.password,
      userType: data.userType,
      registrationDate: data.registrationDate,
    });
    return {
      accessToken: this.generateJwt({
        sub: user.userId,
        type: user.userType,
      }),
      type: data.userType,
    };
  }
}
