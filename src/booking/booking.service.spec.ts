import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { ServiceRepository } from '../service/repository/service.repository';
import { BookingRepository } from './repository/booking.repository';
import { EmployeeRepository } from '../employee/repository/employee.repository';

describe('BookingService', () => {
  let service: BookingService;
  let bookingRepository: BookingRepository;
  let serviceRepository: ServiceRepository;
  let employeeRepository: EmployeeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        {
          provide: BookingRepository,
          useValue: {
            countBookingByRangeStartEndTime: jest.fn(),
            addBooking: jest.fn(),
          },
        },
        {
          provide: ServiceRepository,
          useValue: {
            getServiceById: jest.fn(),
          },
        },
        {
          provide: EmployeeRepository,
          useValue: {
            countEmployeeInCharge: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
    bookingRepository = module.get<BookingRepository>(BookingRepository);
    serviceRepository = module.get<ServiceRepository>(ServiceRepository);
    employeeRepository = module.get<EmployeeRepository>(EmployeeRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(bookingRepository).toBeDefined();
    expect(serviceRepository).toBeDefined();
    expect(employeeRepository).toBeDefined();
  });

  describe('Add Booking', () => {
    // it('it should add booking to database and return correctly', async () => {
    //   // Arrange
    //   const date = new Date();
    //   const createBookingDto = {
    //     name: 'Bambang',
    //     email: 'Bambang@gmail.com',
    //     noTlp: '087908777654',
    //     date,
    //     startTime: '08:00',
    //     service: '123',
    //   };
    //   const user = { id: '123' };
    //   const services = {
    //     id: '123',
    //     name: 'potong',
    //     price: 30000,
    //     duration: '00:40',
    //   };
    //   const employeeInCharge = 3;
    //   const numberOfBooking = 1;
    //   jest.spyOn(serviceRepository, 'getServiceById').mockReturnValue(services);
    //   // Action
    //   const res = await service.addBooking(createBookingDto, user);
    // });
  });
});
