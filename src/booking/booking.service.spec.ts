import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { ServiceRepository } from '../service/repository/service.repository';
import { BookingRepository } from './repository/booking.repository';
import { EmployeeRepository } from '../employee/repository/employee.repository';
import { HttpStatus } from '@nestjs/common';
import { UserRepository } from '../user/repository/user.repository';

describe('BookingService', () => {
  let bookingService: BookingService;

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

    bookingService = module.get<BookingService>(BookingService);
  });

  it('should be defined', () => {
    expect(bookingService).toBeDefined();
  });

  describe('Add Booking', () => {
    it('it should return created status code if booking is successful', async () => {
      // Arrange
      const createBookingDto = {
        name: 'rudi',
        phone: '098765435778',
        date: '2023-10-09',
        startTime: '08:00',
        endTime: '08:40',
        barberman: 'Helos',
        serviceId: '123',
        userId: '123',
      };

      const service = {
        id: '123',
        name: 'potong',
        price: 20000,
        duration: '00:40',
      };

      const expectedBooking = {
        id: '1700469424256',
        name: 'rudi',
        email: 'rudi@gmail.com',
        noTlp: '18129210231',
        date: new Date(),
        startTime: '08:00:00',
        endTime: '08:40:00',
        status: 'dipesan',
        userId: '63f1aa6f-e38b-4825-a389-8990c3d16e1c',
        serviceId: '6d2c1075-5f28-47aa-9505-eb384b35f57a',
        employeeId: null,
        barberman: 'Helos',
      };

      const user = {
        id: '123',
        name: 'Rudi',
      };

      jest.spyOn(userRepositoryMock, 'getUserById').mockReturnValue(user);

      jest
        .spyOn(serviceRepositoryMock, 'getServiceById')
        .mockReturnValue(service);

      jest
        .spyOn(bookingRepositoryMock, 'userAddBooking')
        .mockReturnValue({ raw: [expectedBooking] });

      // Action
      const res = await bookingService.userAddBooking(createBookingDto);

      // Assert
      expect(res).toStrictEqual({
        statusCode: HttpStatus.CREATED,
        data: expectedBooking,
      });
    });
  });
});
