import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { ServiceRepository } from '../service/repository/service.repository';
import { BookingRepository } from './repository/booking.repository';
import { EmployeeRepository } from '../employee/repository/employee.repository';
import { HttpStatus } from '@nestjs/common';
import dayjs from 'dayjs';

describe('BookingService', () => {
  let bookingService: BookingService;

  // Mocking dependencies
  const bookingRepositoryMock = {
    countBookingByRangeStartEndTime: jest.fn(),
    addBooking: jest.fn(),
  };

  const serviceRepositoryMock = {
    getServiceById: jest.fn(),
  };

  const employeeRepositoryMock = {
    countEmployeeInCharge: jest.fn(),
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
      ],
    }).compile();

    bookingService = module.get<BookingService>(BookingService);
  });

  it('should be defined', () => {
    expect(bookingService).toBeDefined();
  });

  describe('Add Booking', () => {
    it('should return conflict status code if the booking is full', async () => {
      // Arrange
      const user = { id: '123' };
      const employeeInCharge = 3;
      const numberOfBooking = 3;

      const createBookingDto = {
        name: 'Bambang',
        email: 'Bambang@gmail.com',
        noTlp: '087908777654',
        date: '2023-10-09',
        startTime: '08:00',
        service: '123',
      };

      const service = {
        id: '123',
        name: 'potong',
        price: 20000,
        duration: '00:40',
      };

      jest
        .spyOn(serviceRepositoryMock, 'getServiceById')
        .mockReturnValue(service);

      jest
        .spyOn(employeeRepositoryMock, 'countEmployeeInCharge')
        .mockReturnValue(employeeInCharge);

      jest
        .spyOn(bookingRepositoryMock, 'countBookingByRangeStartEndTime')
        .mockReturnValue(numberOfBooking);

      // Action
      const res = await bookingService.addBooking(createBookingDto, user);

      // Assert
      expect(res).toStrictEqual({
        statusCode: HttpStatus.CONFLICT,
        message: 'full',
      });
    });

    it('it should return created status code if booking is successful', async () => {
      // Arrange
      const user = { id: '123' };
      const employeeInCharge = 3;
      const numberOfBooking = 1;
      const barberman = 2;

      const createBookingDto = {
        name: 'Bambang',
        email: 'Bambang@gmail.com',
        noTlp: '087908777654',
        date: '2023-10-09',
        startTime: '08:00',
        service: '123',
      };

      const service = {
        id: '123',
        name: 'potong',
        price: 20000,
        duration: '00:40',
      };

      let endTime = dayjs(
        `${createBookingDto.date} ${createBookingDto.startTime}`,
      );

      const duration = dayjs(`${createBookingDto.date} ${service.duration}`);

      endTime = endTime
        .add(Number(duration.format('H')), 'h')
        .add(Number(duration.format('m')), 'm');

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
        barberman: 1,
      };

      jest
        .spyOn(serviceRepositoryMock, 'getServiceById')
        .mockReturnValue(service);

      jest
        .spyOn(employeeRepositoryMock, 'countEmployeeInCharge')
        .mockReturnValue(employeeInCharge);

      jest
        .spyOn(bookingRepositoryMock, 'countBookingByRangeStartEndTime')
        .mockReturnValue(numberOfBooking);

      jest
        .spyOn(bookingRepositoryMock, 'addBooking')
        .mockReturnValue({ raw: [expectedBooking] });

      // Action
      const res = await bookingService.addBooking(createBookingDto, user);

      // Assert
      expect(res).toStrictEqual({
        statusCode: HttpStatus.CREATED,
        data: expectedBooking,
      });
      expect(serviceRepositoryMock.getServiceById).toBeCalledWith(
        createBookingDto.service,
      );
      expect(
        bookingRepositoryMock.countBookingByRangeStartEndTime,
      ).toBeCalledWith(
        createBookingDto.startTime,
        endTime.format('HH:mm'),
        dayjs(createBookingDto.date).toDate(),
      );
      expect(bookingRepositoryMock.addBooking).toBeCalledWith(
        createBookingDto,
        endTime,
        user.id,
        barberman,
        expect.any(String),
      );
    });
  });
});
