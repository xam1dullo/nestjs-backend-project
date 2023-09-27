import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('events')
export class EventQueueProcessor {
  private readonly logger = new Logger(EventQueueProcessor.name);

  @Process('event')
  handleEvents(job: Job) {
    // console.log('transcode');
    this.logger.debug('Start transcoding...', new Date());
    this.logger.debug(job.data);
    this.logger.debug('Transcoding completed');
  }
}
