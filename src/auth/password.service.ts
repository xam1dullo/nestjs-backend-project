import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash, compare, genSalt } from 'bcrypt';

@Injectable()
export class PasswordService {
  constructor(private readonly configService: ConfigService) {}

  get bcryptSalt(): Promise<string> {
    const securityConfig = this.configService.get<number>('bcryptSaltOrRound');
    const salt = genSalt(securityConfig);
    return salt;
  }

  validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await this.bcryptSalt;
    return hash(password, salt);
  }
}
