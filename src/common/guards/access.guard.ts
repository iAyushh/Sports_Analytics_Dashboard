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
    const user = request.user as AuthenticatedUser;

    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    // Admin & Master → full access
    if (user.type === UserRole.admin || user.type === UserRole.master) {
      return true;
    }

    // Player logic
    if (user.type === UserRole.player) {
      const targetUserId = request.params?.userId
        ? Number(request.params.userId)
        : null;

      if (targetUserId && targetUserId !== user.id) {
        throw new ForbiddenException(
          'Players can access only their own data',
        );
      }

      return true;
    }

    throw new ForbiddenException('Access denied');
  }
}