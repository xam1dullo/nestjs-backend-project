import { Test, TestingModule } from '@nestjs/testing';
import { LocationsSocketService } from './locations-socket.service';

describe('LocationsSocketService', () => {
  let service: LocationsSocketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationsSocketService],
    }).compile();

    service = module.get<LocationsSocketService>(LocationsSocketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
