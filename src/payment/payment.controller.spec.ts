import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { BookingService } from '../booking/booking.service';
import { BookingRepository } from '../booking/repository/booking.repository';
import { EmployeeRepository } from '../employee/repository/employee.repository';
import { ServiceRepository } from '../service/repository/service.repository';
import { UserRepository } from '../user/repository/user.repository';
import { Repository } from 'typeorm';

describe('PaymentController', () => {
  let controller: PaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        PaymentService,
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

    controller = module.get<PaymentController>(PaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
