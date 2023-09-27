import { UsersService } from './../users/users.service';
import { PasswordService } from './password.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Prisma, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './../prisma/prisma.service';
import { AuthEntity } from './entities/auth.entity';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async signUp(payload: Prisma.UserCreateInput) {
    try {
      const existingUser = await this.usersService.findByEmail(payload.email);
      console.log({ msg: 'Error', existingUser });
      if (existingUser) {
        throw new ConflictException(`Email ${payload.email} already exists.`);
      }

      const hashPassword = await this.passwordService.hashPassword(
        payload.password,
      );

      payload.password = hashPassword;

      const newUser = await this.prisma.user.create({
        data: payload,
      });

      return this.getToken(newUser.id);
    } catch (error) {
      console.log(error);
    }
  }

  async signIn(createAuthDto: CreateAuthDto): Promise<AuthEntity | Error> {
    const { email, password } = createAuthDto;
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return this.getToken(user.id);
  }

  async profile(req: Request) {
    const refreshToken = req.get('authorization');
    return refreshToken;
  }

  async getToken(userId: string) {
    return { accessToken: this.jwtService.sign({ userId }) };
  }

  async validateUser(userId: string): Promise<User> {
    return await this.usersService.findOne(userId);
  }
}
