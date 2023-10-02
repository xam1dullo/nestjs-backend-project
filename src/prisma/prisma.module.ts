import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import Config from '../common/configs/config';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
