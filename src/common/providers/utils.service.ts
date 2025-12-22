import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../types';
import crypto from 'node:crypto';

@Injectable()
export class UtilsService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables, true>,
  ) {}

  generateSalt(length: 16) {
    return crypto.randomBytes(length).toString('hex');
  }

  hashPassword(data:string, salt: string, length:number): string{
    return crypto.scryptSync(data,salt,length).toString('hex');
  }


}
