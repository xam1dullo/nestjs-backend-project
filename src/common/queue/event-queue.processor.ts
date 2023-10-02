import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@Processor('events')
export class EventQueueProcessor {
  private readonly logger = new Logger(EventQueueProcessor.name);
  constructor() {}
  @WebSocketServer()
  private server: Server;
  @Process('event')
  handleEvents(job: Job) {
    // this.logger.log('transcode');
    this.logger.debug('Start transcoding...', new Date());
    this.logger.debug(job.data);
    this.logger.debug('Transcoding completed');
    const event = JSON.parse(job.data);
    const userSocket = this.server.sockets.sockets[event.userId];
    if (userSocket) {
      userSocket.emit('eventMessage', job.data); // Emit the message to the user
    }
  }
}
