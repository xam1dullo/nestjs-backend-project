import { Test, TestingModule } from '@nestjs/testing';
import { LocationsSocketGateway } from './locations-socket.gateway';
import { LocationsSocketService } from './locations-socket.service';

describe('LocationsSocketGateway', () => {
  let gateway: LocationsSocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationsSocketGateway, LocationsSocketService],
    }).compile();

    gateway = module.get<LocationsSocketGateway>(LocationsSocketGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
