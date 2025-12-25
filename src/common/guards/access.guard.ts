import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticatedUser } from '../types';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRole } from 'generated/prisma/enums';


@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as AuthenticatedUser | undefined;
    if (!user) {
      throw new UnauthorizedException('User not authenticated.');
    }
    return this.validate(request, user);
  }
  private async validate(request: any, user: AuthenticatedUser):Promise<boolean> {
    if (user.type === UserRole.admin) {
      const userInfo = await this.prisma.user.findUnique({
        where: { userId: user.id },
        select: {
          userId: true,
          userType: true,
        },
      });
      if (!userInfo) {
        throw new UnauthorizedException('User not found.');
      }

      if (userInfo.userType === UserRole.admin) {
        return true;
      }
      const targetUserId = request.params?.userId
        ? Number(request.params.userId)
        : null;

        if(userInfo.userType=== UserRole.player){
          if(targetUserId && targetUserId!==userInfo.userId){
            throw new ForbiddenException("Players can access only their own data.")
          }
          return true;
        }
        if(userInfo.userType===UserRole.master){
          return true;
        }
        throw new ForbiddenException('Access denied.')
    }
    return true;
  }
}
