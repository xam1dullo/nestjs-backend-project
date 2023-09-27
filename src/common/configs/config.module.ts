import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  exports: [ConfigModule],
})
export class AppConfigModule {}
