import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from './booking.controller';
import { ServiceRepository } from '../service/repository/service.repository';
import { BookingService } from './booking.service';
import { BookingRepository } from './repository/booking.repository';
import { EmployeeRepository } from '../employee/repository/employee.repository';
import { Repository } from 'typeorm';
import { UserRepository } from '../user/repository/user.repository';

describe('BookingController', () => {
  let controller: BookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [
        BookingService,
        {
          provide: BookingRepository,
          useClass: Repository,
        },
        {
          provide: ServiceRepository,
          useClass: Repository,
        },
        {
          provide: EmployeeRepository,
          useClass: Repository,
        },
        {
          provide: UserRepository,
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<BookingController>(BookingController);
    module.get<ServiceRepository>(ServiceRepository);
    module.get<EmployeeRepository>(EmployeeRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
