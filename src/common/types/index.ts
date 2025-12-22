import { Request } from 'express';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class EnvironmentVariables {
  @IsInt()
  PORT: number;

  @IsString()
  DATABASE_URL: string;
}


export enum UserRole {
  player,
  master,
  admin,
}

export interface JwtPayload {
  readonly sub: number;
  readonly type: UserRole;
}

export interface ValidatedUser {
  readonly id: number;
  readonly type: UserRole;
}

export interface AuthenticatedUser {
  readonly id: number;
  readonly type: UserRole;
}

export interface Context {
  readonly user: AuthenticatedUser;
}

export interface AuthenticatedRequest extends Request {
  readonly user: AuthenticatedUser;
}
