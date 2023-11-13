import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../../app.module';
import { BookingTableTestHelper } from '../../../helper/booking.table.test.helper';
import { BookingRepository } from './booking.repository';
import { BookingStatus } from '../../enum';
import dayjs from 'dayjs';
import { BookingEntity } from '../entities/booking.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { ServiceEntity } from '../../service/entities/service.entity';
import { UserTableTestHelper } from '../../../helper/user.table.test.helper';
import { ServiceTableTestHelper } from '../../../helper/service.table.helper';

describe('BookingRepository', () => {
  let bookingRepository: BookingRepository;
  let bookingTableTestHelper: BookingTableTestHelper;
  let userTableTestHelper: UserTableTestHelper;
  let serviceTableTestHelper: ServiceTableTestHelper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forFeature([BookingEntity, UserEntity, ServiceEntity]),
      ],
      providers: [
        BookingRepository,
        BookingTableTestHelper,
        UserTableTestHelper,
        ServiceTableTestHelper,
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
  });

  afterEach(async () => {
    await bookingTableTestHelper.cleanTable();
    await userTableTestHelper.cleanTable();
    await serviceTableTestHelper.cleanTable();
  });

  it('should be defined', () => {
    expect(bookingRepository).toBeDefined();
    expect(bookingTableTestHelper).toBeDefined();
    expect(userTableTestHelper).toBeDefined();
    expect(serviceTableTestHelper).toBeDefined();
  });

  describe('function countBookingByRangeStartEndTime', () => {
    it('should count data from database and return correctly', async () => {
      // Arrange
      const startTime = '09:00:00';
      const endTime = '09:40:00';
      const startTime2 = '15:00:00';
      const endTime2 = '15:40:00';
      const date = '2023-10-09';

      const booking1 = {
        id: 'booking-123',
        date: date,
        startTime: '08:30',
        endTime: '09:10',
        status: BookingStatus.BOOKING,
      };

      // status booking success
      const booking2 = {
        id: 'booking-124',
        date: date,
        startTime: '09:10',
        endTime: '09:50',
        status: BookingStatus.SUCCESS,
      };

      // status booking failed
      const booking3 = {
        id: 'booking-125',
        date: date,
        startTime: '09:20',
        endTime: '10:00',
        status: BookingStatus.FAILED,
      };

      // different date
      const booking4 = {
        id: 'booking-126',
        date: '2023-10-10',
        startTime: '09:30',
        endTime: '10:10',
        status: BookingStatus.BOOKING,
      };

      // out of range time
      const booking5 = {
        id: 'booking-127',
        date: date,
        startTime: '09:50',
        endTime: '10:30',
        status: BookingStatus.BOOKING,
      };

      // booking status served
      const booking6 = {
        id: 'booking-128',
        date: date,
        startTime: '08:30',
        endTime: '09:10',
        status: BookingStatus.SERVED,
      };

      await bookingTableTestHelper.addBooking(booking1);
      await bookingTableTestHelper.addBooking(booking2);
      await bookingTableTestHelper.addBooking(booking3);
      await bookingTableTestHelper.addBooking(booking4);
      await bookingTableTestHelper.addBooking(booking5);
      await bookingTableTestHelper.addBooking(booking6);

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

  describe('addBooking', () => {
    it('should add booking to database and return correctly', async () => {
      // Arrange
      const user = {
        username: 'andi123',
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

      const date = new Date('2023-10-09');

      const bookingDto = {
        name: 'rudi',
        email: 'rudi@gmail.com',
        noTlp: '18129210231',
        date,
        startTime: '08:00',
        service: newService.id,
      };

      const userId = newUser.id;
      const endTime = '08:40';
      const idBooking = Date.now().toString();

      // Action
      await bookingRepository.addBooking(
        bookingDto,
        endTime,
        userId,
        1,
        idBooking,
      );

      // Assert
      const allBooking = await bookingTableTestHelper.getAllBooking();
      const newBooking = await bookingTableTestHelper.findBookingById(
        idBooking,
      );

      expect(allBooking).toHaveLength(1);
      expect(newBooking[0]).toMatchObject({
        id: idBooking,
        name: bookingDto.name,
        email: bookingDto.email,
        noTlp: bookingDto.noTlp,
        date: bookingDto.date,
        startTime: `${bookingDto.startTime}:00`,
        endTime: `${endTime}:00`,
        user: userId,
        service: bookingDto.service,
      });
    });
  });
});
