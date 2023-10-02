import { ConfigService, ConfigModule } from '@nestjs/config';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { EventQueuesModule } from '../common/queue/event-queue.module';

@Module({
  imports: [PrismaModule, JwtModule, EventQueuesModule, ConfigModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, JwtService, ConfigService],
  exports: [UsersService],
})
export class UsersModule {}
