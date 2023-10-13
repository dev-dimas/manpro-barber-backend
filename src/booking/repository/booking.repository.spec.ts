import { Test, TestingModule } from '@nestjs/testing';
import { BookingRepository } from './booking.repository';
import { DataSource } from 'typeorm';
import { BookingStatus } from '../../enum';
import { BookingTableTestHelper } from '../helper/booking.table.test.helper';

describe('BookingRepository', () => {
  let bookingRepository: BookingRepository;
  let helperRepository: BookingTableTestHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingRepository, DataSource],
    }).compile();

    const helper: TestingModule = await Test.createTestingModule({
      providers: [BookingTableTestHelper, DataSource],
    }).compile();

    bookingRepository = module.get<BookingRepository>(BookingRepository);
    helperRepository = helper.get<BookingTableTestHelper>(
      BookingTableTestHelper,
    );
  });

  //   afterEach(async () => {
  //     await helperRepository.cleanTable();
  //   });

  it('should be defined', () => {
    expect(bookingRepository).toBeDefined();
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
      date: '2023-04-20',
      startTime: '08:00',
      endTime: '08:40',
      status: BookingStatus.BOOKING,
      userId: '233bbbd8-c31e-47c5-b3cf-e75a02e6889c',
      barberId: 'd7e0dca1-76d0-4705-a57c-01c86124d200',
    };

    const booking2 = {
      id: 'user-123',
      name: 'andi',
      email: 'andi@gmail.com',
      noTlp: '18129210231',
      date: '2023-04-20',
      startTime: '08:00',
      endTime: '08:40',
      status: BookingStatus.BOOKING,
      userId: '233bbbd8-c31e-47c5-b3cf-e75a02e6889c',
      barberId: 'd7e0dca1-76d0-4705-a57c-01c86124d200',
    };

    await helperRepository.addBooking(booking1);

    jest.spyOn(bookingRepository, 'count').mockImplementation(async () => 1);

    const count = await bookingRepository.getBookingByRangeStartEndTime(
      startTime,
      endTime,
      date,
    );

    expect(count).toBe(1); // Replace 5 with the expected count for your test case
  });
});
