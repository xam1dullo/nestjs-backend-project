import { PartialType } from '@nestjs/mapped-types';
import { CreateEventsQueueDto } from './create-events-socket.dto';

export class UpdateEventsSocketDto extends PartialType(CreateEventsQueueDto) {}
