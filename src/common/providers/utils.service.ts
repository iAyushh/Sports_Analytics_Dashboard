import { Injectable } from '@nestjs/common';
import crypto from 'node:crypto';

@Injectable()
export class UtilsService {
  constructor(
    
  ) {}

  generateSalt(length = 16):string{
    return crypto.randomBytes(length).toString('hex');
  }

  hashPassword(data:string, salt: string, length:number): string{
    return crypto.scryptSync(data,salt,length).toString('hex');
  }


}
