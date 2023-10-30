import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from './booking.controller';
import { ServiceRepository } from '../service/repository/service.repository';
import { BookingService } from './booking.service';
import { BookingRepository } from './repository/booking.repository';

describe('BookingController', () => {
  let controller: BookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
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

    controller = module.get<BookingController>(BookingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
