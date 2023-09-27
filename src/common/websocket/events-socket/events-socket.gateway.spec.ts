import { Test, TestingModule } from '@nestjs/testing';
import { EventsSocketGateway } from './events-socket.gateway';
import { EventsSocketService } from './events-socket.service';

describe('EventsSocketGateway', () => {
  let gateway: EventsSocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsSocketGateway, EventsSocketService],
    }).compile();

    gateway = module.get<EventsSocketGateway>(EventsSocketGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
