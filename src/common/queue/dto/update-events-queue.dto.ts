import { PartialType } from '@nestjs/mapped-types';
import { CreateEventsQueueDto } from './create-events-queue.dto';

export class UpdateEventsQueueDto extends PartialType(CreateEventsQueueDto) {
  id: string;
}
