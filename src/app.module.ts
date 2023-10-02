import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';
import { Server } from 'socket.io';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AppConfigModule } from './common/configs/config.module';
import { EventsController } from './events/events.controller';
import { EventsModule } from './events/events.module';
import { EventsService } from './events/events.service';
import { EventQueuesModule } from './common/queue/event-queue.module';
import { LocationsSocketModule } from './common/websocket/locations-socket/locations-socket.module';
import { EventsSocketModule } from './common/websocket/events-socket/events-socket.module';
import { RedisIoAdapter } from './common/websocket/socket-io.adapter';

@Module({
  imports: [
    EventsModule,
    AuthModule,
    PrismaModule,
    UsersModule,
    EventQueuesModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    AppConfigModule,
    ConfigModule,
    LocationsSocketModule,
    EventsSocketModule,
  ],
  controllers: [AppController, EventsController],
  providers: [AppService, PrismaService, EventsService, Server, RedisIoAdapter],
})
export class AppModule {}
