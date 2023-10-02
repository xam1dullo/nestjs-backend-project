import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash, compare, genSalt } from 'bcrypt';

@Injectable()
export class PasswordService {
  private readonly logger = new Logger(PasswordService.name);
  constructor(private readonly configService: ConfigService) {}

  get bcryptSalt(): Promise<string> {
    const securityConfig = this.configService.get<number>('bcryptSaltOrRound');
    this.logger.log('securityConfig', securityConfig);
    const salt = genSalt(securityConfig);
    return salt;
  }

  validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await this.bcryptSalt;
    this.logger.log('salt', salt);
    return hash(password, salt);
  }
}
