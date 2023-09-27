import { Test, TestingModule } from '@nestjs/testing';
import { EventsSocketService } from './events-socket.service';

describe('EventsSocketService', () => {
  let service: EventsSocketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsSocketService],
    }).compile();

    service = module.get<EventsSocketService>(EventsSocketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
