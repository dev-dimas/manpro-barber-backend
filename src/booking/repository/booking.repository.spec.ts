import { BookingRepository } from './booking.repository';
import { BookingStatus } from '../../enum';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from '../entities';
import { AppModule } from '../../app.module';
import { BookingTableTestHelper } from '../helper/booking.table.test.helper';

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
    // await bookingTableTestHelper.cleanTable();
  });

  it('should be defined', () => {
    expect(bookingRepository).toBeDefined();
    expect(bookingTableTestHelper).toBeDefined();
  });

  it('should get booking count by range start and end time', async () => {
    // You can create test data or mock data as needed
    const startTime = '08:00';
    const endTime = '10:00';
    const date = new Date('2023-10-12');

    const booking1 = {
      id: 'user-123',
      name: 'andi',
      email: 'andi@gmail.com',
      noTlp: '18129210231',
      date: '2023-09-09',
      startTime: '08:00 AM',
      endTime: '08:40 AM',
      status: BookingStatus.BOOKING,
      userId: '233bbbd8-c31e-47c5-b3cf-e75a02e6889c',
    };

    const booking2 = {
      id: 'user-123',
      name: 'andi',
      email: 'andi@gmail.com',
      noTlp: '18129210231',
      date: new Date(),
      startTime: '08:00',
      endTime: '08:40',
      status: BookingStatus.BOOKING,
    };

    // await bookingTableTestHelper.addBooking(booking1);

    // const res = await bookingRepository.getBookingByRangeStartEndTime(
    //   startTime,
    //   endTime,
    //   date,
    // );

    // console.log(res);
  });
});
