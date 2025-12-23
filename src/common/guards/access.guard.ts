import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "src/auth";
import { AuthenticatedUser, } from "../types";
import { PrismaService } from "src/prisma/prisma.service";
import { UserRole } from "generated/prisma/enums";



@Injectable()
export class AccessGuard implements CanActivate{

  constructor(private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ){}
  async canActivate(context: ExecutionContext): Promise<boolean>  {
    const request = context.switchToHttp().getRequest();
    const user = request.user as AuthenticatedUser|undefined;
    if(!user) return false;
    return await this.validate(user);

  }
  async validate (user: AuthenticatedUser){
     if(user.type===UserRole.admin){
      const userInfo = await this.prisma.user.findUnique({
        where:{userId: user.id,
          userType:user.type,
        },
      })
     }
     return true;
  }

}
