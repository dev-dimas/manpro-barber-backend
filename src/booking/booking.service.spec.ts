import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { ServiceRepository } from '../service/repository/service.repository';
import { BookingRepository } from './repository/booking.repository';

describe('BookingService', () => {
  let service: BookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        {
          provide: BookingRepository,
          useValue: {
            addBarber: jest.fn(),
            getAllBarber: jest.fn(),
          },
        },
        {
          provide: ServiceRepository,
          useValue: {
            getServiceById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
