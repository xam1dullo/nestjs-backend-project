import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Prisma } from '@prisma/client';
import { EventsSocketService } from './events-socket.service';
import { UpdateEventsSocketDto } from './dto/update-events-socket.dto';
import { Logger } from '@nestjs/common';
import { PaginationDto } from 'src/events/dto/pagination-event.dto';
import { CustomEventCreateInput } from '../../../events/events.service';

@WebSocketGateway()
export class EventsSocketGateway {
  private readonly logger = new Logger(EventsSocketGateway.name);

  constructor(private readonly eventsSocketService: EventsSocketService) {}

  // @UseGuards(JwtAuthGuard)
  @SubscribeMessage('createEvent')
  async create(
    @MessageBody() createEventsSocketDto: CustomEventCreateInput,
  ): Promise<Prisma.EventCreateManyInput> {
    this.logger.log(createEventsSocketDto);

    return await this.eventsSocketService.create(createEventsSocketDto);
  }

  @SubscribeMessage('findAllEvent')
  findAll(@MessageBody() paginationDto: PaginationDto) {
    this.logger.log(paginationDto);

    return this.eventsSocketService.findAll(paginationDto);
  }

  @SubscribeMessage('findOneEvent')
  async findOne(@MessageBody('id') id: string) {
    console.log('EvvveeentID', id);

    return await this.eventsSocketService.findOne(id);
  }

  @SubscribeMessage('updateEvent')
  update(@MessageBody() updateEventsSocketDto: UpdateEventsSocketDto) {
    return this.eventsSocketService.update(updateEventsSocketDto);
  }

  @SubscribeMessage('removeEvent')
  async remove(
    @MessageBody('id') id: string,
  ): Promise<Prisma.EventCreateInput> {
    const event = await this.eventsSocketService.remove(id);
    console.log('EEEEEEEEEEEEEE', event);
    return event;
  }
}
