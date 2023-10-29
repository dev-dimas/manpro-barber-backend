import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../../app.module';
import { BookingTableTestHelper } from '../helper/booking.table.test.helper';
import { BookingRepository } from './booking.repository';
import { BookingStatus } from '../../enum';
import dayjs from 'dayjs';
import { BookingEntity } from '../entities/booking.entity';

describe('BookingRepository', () => {
  let bookingRepository: BookingRepository;
  let bookingTableTestHelper: BookingTableTestHelper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forFeature([BookingEntity])],
      providers: [BookingRepository, BookingTableTestHelper],
    }).compile();

    bookingRepository = module.get<BookingRepository>(BookingRepository);
    bookingTableTestHelper = module.get<BookingTableTestHelper>(
      BookingTableTestHelper,
    );
  });

  afterEach(async () => {
    await bookingTableTestHelper.cleanTable();
  });

  it('should be defined', () => {
    expect(bookingRepository).toBeDefined();
    expect(bookingTableTestHelper).toBeDefined();
  });

  describe('function countBookingByRangeStartEndTime', () => {
    it('should count data from database and return correctly', async () => {
      // Arrange
      const startTime = '09:00:00';
      const endTime = '09:40:00';
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
      const booking = await bookingRepository.countBookingByRangeStartEndTime(
        startTime,
        endTime,
        dayjs(date).toDate(),
      );

      expect(booking).toEqual(2);
    });
  });
});
