import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { BookingRepository } from '../booking/repository/booking.repository';
import { EmployeeRepository } from '../employee/repository/employee.repository';
import { ServiceRepository } from '../service/repository/service.repository';
import { UserRepository } from '../user/repository/user.repository';
import { BookingService } from '../booking/booking.service';

describe('PaymentService', () => {
  let service: PaymentService;

  // Mocking dependencies
  const bookingRepositoryMock = {
    countBookingByRangeStartEndTime: jest.fn(),
    userAddBooking: jest.fn(),
  };

  const serviceRepositoryMock = {
    getServiceById: jest.fn(),
  };

  const userRepositoryMock = {
    getUserById: jest.fn(),
  };

  const employeeRepositoryMock = {
    countEmployeeInCharge: jest.fn(),
    getEmployeeById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        BookingService,
        {
          provide: BookingRepository,
          useValue: bookingRepositoryMock,
        },
        {
          provide: ServiceRepository,
          useValue: serviceRepositoryMock,
        },
        {
          provide: EmployeeRepository,
          useValue: employeeRepositoryMock,
        },
        {
          provide: UserRepository,
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
