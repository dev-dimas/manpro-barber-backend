import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../../app.module';
import { BookingTableTestHelper } from '../../../helper/booking.table.test.helper';
import { BookingRepository } from './booking.repository';
import { BookingStatus, EmployeeRoleType, GenderType } from '../../enum';
import dayjs from 'dayjs';
import { BookingEntity } from '../entities/booking.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { ServiceEntity } from '../../service/entities/service.entity';
import { UserTableTestHelper } from '../../../helper/user.table.test.helper';
import { ServiceTableTestHelper } from '../../../helper/service.table.helper';
import { EmployeeTableTestHelper } from '../../../helper/employee.table.test.helper';
import { EmployeeEntity } from '../../employee/entities/employee.entity';

describe('BookingRepository', () => {
  let bookingRepository: BookingRepository;
  let bookingTableTestHelper: BookingTableTestHelper;
  let userTableTestHelper: UserTableTestHelper;
  let serviceTableTestHelper: ServiceTableTestHelper;
  let employeeTableTestHelper: EmployeeTableTestHelper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forFeature([
          BookingEntity,
          UserEntity,
          ServiceEntity,
          EmployeeEntity,
        ]),
      ],
      providers: [
        BookingRepository,
        BookingTableTestHelper,
        UserTableTestHelper,
        ServiceTableTestHelper,
        EmployeeTableTestHelper,
      ],
    }).compile();

    bookingRepository = module.get<BookingRepository>(BookingRepository);
    bookingTableTestHelper = module.get<BookingTableTestHelper>(
      BookingTableTestHelper,
    );
    userTableTestHelper = module.get<UserTableTestHelper>(UserTableTestHelper);
    serviceTableTestHelper = module.get<ServiceTableTestHelper>(
      ServiceTableTestHelper,
    );
    employeeTableTestHelper = module.get<EmployeeTableTestHelper>(
      EmployeeTableTestHelper,
    );
  });

  afterEach(async () => {
    await bookingTableTestHelper.cleanTable();
    await userTableTestHelper.cleanTable();
    await serviceTableTestHelper.cleanTable();
    await employeeTableTestHelper.cleanTable();
  });

  it('should be defined', () => {
    expect(bookingRepository).toBeDefined();
  });

  describe('function countBookingByRangeStartEndTime', () => {
    it('should count data from database and return correctly', async () => {
      // Arrange
      const startTime = '09:00:00';
      const endTime = '09:40:00';
      const startTime2 = '15:00:00';
      const endTime2 = '15:40:00';
      const date = '2023-10-09';

      const service = {
        name: 'potong',
        price: 20000,
        duration: '00:40',
      };
      const newService = await serviceTableTestHelper.addService(service);

      const booking1 = {
        id: 'booking-123',
        date: date,
        startTime: '08:30',
        endTime: '09:10',
        status: BookingStatus.BOOKING,
        serviceId: newService.id,
      };

      // status booking success
      const booking2 = {
        id: 'booking-124',
        date: date,
        startTime: '09:10',
        endTime: '09:50',
        status: BookingStatus.SUCCESS,
        serviceId: newService.id,
      };

      // status booking failed
      const booking3 = {
        id: 'booking-125',
        date: date,
        startTime: '09:20',
        endTime: '10:00',
        status: BookingStatus.FAILED,
        serviceId: newService.id,
      };

      // different date
      const booking4 = {
        id: 'booking-126',
        date: '2023-10-10',
        startTime: '09:30',
        endTime: '10:10',
        status: BookingStatus.BOOKING,
        serviceId: newService.id,
      };

      // out of range time
      const booking5 = {
        id: 'booking-127',
        date: date,
        startTime: '09:50',
        endTime: '10:30',
        status: BookingStatus.BOOKING,
        serviceId: newService.id,
      };

      // booking status pandding
      const booking6 = {
        id: 'booking-128',
        date: date,
        startTime: '08:30',
        endTime: '09:10',
        status: BookingStatus.PANDING,
        serviceId: newService.id,
      };

      // true
      const booking7 = {
        id: 'booking-129',
        date: date,
        startTime: '09:30',
        endTime: '10:10',
        status: BookingStatus.BOOKING,
        serviceId: newService.id,
      };

      await bookingTableTestHelper.addBooking(booking1);
      await bookingTableTestHelper.addBooking(booking2);
      await bookingTableTestHelper.addBooking(booking3);
      await bookingTableTestHelper.addBooking(booking4);
      await bookingTableTestHelper.addBooking(booking5);
      await bookingTableTestHelper.addBooking(booking6);
      await bookingTableTestHelper.addBooking(booking7);

      // Action
      const res = await bookingRepository.countBookingByRangeStartEndTime(
        startTime,
        endTime,
        dayjs(date).toDate(),
      );

      const res2 = await bookingRepository.countBookingByRangeStartEndTime(
        startTime2,
        endTime2,
        dayjs(date).toDate(),
      );

      expect(res).toEqual(2);
      expect(res2).toEqual(0);
    });
  });

  describe('userAddBooking', () => {
    it('should add booking to database and return correctly', async () => {
      // Arrange
      const user = {
        password: 'andi123',
        email: 'andi123@gmail.com',
        name: 'andi',
        phone: '081234876945',
      };

      const newUser = await userTableTestHelper.addUser(user);

      const service = {
        name: 'potong',
        price: 20000,
        duration: '00:40',
      };

      const newService = await serviceTableTestHelper.addService(service);

      const userId = newUser.id;
      const endTime = '08:40';
      const idBooking = Date.now().toString();
      const barberman = 'Helos';

      const bookingDto = {
        name: 'rudi',
        phone: '098765435778',
        date: '2023-10-09',
        startTime: '08:00',
        endTime: '08:40',
        barberman,
        serviceId: newService.id,
        userId,
      };

      // Action
      const res = await bookingRepository.userAddBooking(bookingDto, idBooking);

      // Assert
      const allBooking = await bookingTableTestHelper.getAllBooking();

      expect(allBooking).toHaveLength(1);
      expect(res.raw[0]).toMatchObject({
        id: idBooking,
        name: bookingDto.name,
        date: dayjs(bookingDto.date).toDate(),
        startTime: `${bookingDto.startTime}:00`,
        endTime: `${endTime}:00`,
        barberman,
        userId: userId,
        serviceId: bookingDto.serviceId,
      });
    });
  });

  describe('employeeAddBooking', () => {
    it('should add booking to database and return correctly', async () => {
      // Arrange
      const employee = {
        name: 'andi',
        email: 'andi@gmail.com',
        phone: '18129210231',
        password: 'andi12345',
        gender: GenderType.L,
        role: EmployeeRoleType.BARBERMAN,
      };

      const newEmployee = await employeeTableTestHelper.addEmployee(employee);

      const service = {
        name: 'potong',
        price: 20000,
        duration: '00:40',
      };

      const newService = await serviceTableTestHelper.addService(service);

      const employeeId = newEmployee.id;
      const endTime = '08:40';
      const idBooking = Date.now().toString();
      const barberman = 'Helos';

      const bookingDto = {
        name: 'rudi',
        phone: '098765435778',
        date: '2023-10-09',
        startTime: '08:00',
        serviceId: newService.id,
        employeeId,
      };

      // Action
      const res = await bookingRepository.employeeAddBooking(
        bookingDto,
        endTime,
        barberman,
        idBooking,
      );

      // Assert
      const allBooking = await bookingTableTestHelper.getAllBooking();

      expect(allBooking).toHaveLength(1);
      expect(res.raw[0]).toMatchObject({
        id: idBooking,
        name: bookingDto.name,
        date: dayjs(bookingDto.date).toDate(),
        startTime: `${bookingDto.startTime}:00`,
        endTime: `${endTime}:00`,
        barberman,
        employeeId,
        serviceId: bookingDto.serviceId,
      });
    });
  });

  describe('updateBookingStatus', () => {
    it('should update status booking to database and return correctly', async () => {
      // Arrange
      const user = {
        password: 'andi123',
        email: 'andi123@gmail.com',
        name: 'andi',
        phone: '081234876945',
      };
      const newUser = await userTableTestHelper.addUser(user);

      const service = {
        name: 'potong',
        price: 20000,
        duration: '00:40',
      };
      const newService = await serviceTableTestHelper.addService(service);

      const employee = {
        name: 'andi',
        email: 'andi@gmail.com',
        phone: '18129210231',
        password: 'andi12345',
        gender: GenderType.L,
        role: EmployeeRoleType.BARBERMAN,
      };
      const newEmployee = await employeeTableTestHelper.addEmployee(employee);

      const booking = {
        id: 'booking-129',
        date: '2023-10-09',
        startTime: '09:30',
        endTime: '10:10',
        phone: '087908789000',
        status: BookingStatus.BOOKING,
        userId: newUser.id,
        serviceId: newService.id,
        employeeId: null,
      };

      const newBooking = await bookingTableTestHelper.addBooking(booking);

      // Action
      const res = await bookingRepository.updateBookingStatus(
        newBooking.id,
        newEmployee.id,
      );

      expect(res.affected).toEqual(1);
      expect(res.raw[0]).toMatchObject({
        id: newBooking.id,
        status: BookingStatus.SUCCESS,
        userId: newUser.id,
        serviceId: newService.id,
        name: newBooking.name,
        phone: newBooking.phone,
        employeeId: newEmployee.id,
        barberman: newBooking.barberman,
        date: dayjs(booking.date).toDate(),
        startTime: `${booking.startTime}:00`,
        endTime: `${booking.endTime}:00`,
      });
    });
  });

  describe('getAllBookingByStatusBookingAndDate', () => {
    it('should get booking by status booking and date from database and return correctly', async () => {
      // Arrange
      const date = '2023-10-09';

      const service = {
        name: 'potong',
        price: 20000,
        duration: '00:40',
      };
      const newService = await serviceTableTestHelper.addService(service);

      const booking1 = {
        id: 'booking-123',
        date: date,
        startTime: '08:30:00',
        endTime: '09:10:00',
        status: BookingStatus.SUCCESS,
        serviceId: newService.id,
      };

      const booking2 = {
        id: 'booking-124',
        date: date,
        startTime: '09:20:00',
        endTime: '10:00:00',
        status: BookingStatus.BOOKING,
        serviceId: newService.id,
      };

      const booking3 = {
        id: 'booking-125',
        date: date,
        startTime: '09:20:00',
        endTime: '10:00:00',
        status: BookingStatus.BOOKING,
        serviceId: newService.id,
      };

      const booking4 = {
        id: 'booking-126',
        date: date,
        startTime: '09:30:00',
        endTime: '10:10:00',
        status: BookingStatus.BOOKING,
        serviceId: newService.id,
      };

      const booking5 = {
        id: 'booking-126',
        date: '2023-10-09',
        startTime: '09:30:00',
        endTime: '10:10:00',
        status: BookingStatus.BOOKING,
        serviceId: newService.id,
      };

      await bookingTableTestHelper.addBooking(booking1);
      await bookingTableTestHelper.addBooking(booking2);
      await bookingTableTestHelper.addBooking(booking3);
      await bookingTableTestHelper.addBooking(booking4);
      await bookingTableTestHelper.addBooking(booking5);

      // Action
      const res = await bookingRepository.getAllBookingByStatusBookingAndDate(
        date,
      );

      expect(res).toHaveLength(3);
    });
  });

  describe('coba', () => {
    it('coba', async () => {
      // Arrange
      const date = '2023-12-12';

      const service = {
        name: 'potong',
        price: 20000,
        duration: '00:40',
      };
      const newService = await serviceTableTestHelper.addService(service);

      const user1 = {
        password: 'andi123',
        email: 'andi123@gmail.com',
        name: 'andi',
        phone: '081234876945',
      };
      const newUser1 = await userTableTestHelper.addUser(user1);

      const user2 = {
        password: 'rudi123',
        email: 'rudi123@gmail.com',
        name: 'rudi',
        phone: '081234876945',
      };
      const newUser2 = await userTableTestHelper.addUser(user2);

      const user3 = {
        password: 'soni123',
        email: 'soni123@gmail.com',
        name: 'soni',
        phone: '081234876945',
      };
      const newUser3 = await userTableTestHelper.addUser(user3);

      const booking1 = {
        id: 'booking-123',
        date: date,
        startTime: '08:30:00',
        endTime: '09:10:00',
        status: BookingStatus.SUCCESS,
        serviceId: newService.id,
        userId: newUser1.id,
      };

      const booking2 = {
        id: 'booking-124',
        date: date,
        startTime: '09:20:00',
        endTime: '10:00:00',
        status: BookingStatus.BOOKING,
        serviceId: newService.id,
        userId: newUser2.id,
      };

      const booking3 = {
        id: 'booking-125',
        date: date,
        startTime: '09:20:00',
        endTime: '10:00:00',
        status: BookingStatus.BOOKING,
        serviceId: newService.id,
        userId: newUser3.id,
      };

      await bookingTableTestHelper.addBooking(booking1);
      await bookingTableTestHelper.addBooking(booking2);
      await bookingTableTestHelper.addBooking(booking3);
    });
  });
});
