import { Injectable } from '@nestjs/common';
import { BookingEntity } from '../entities';
import { Repository } from 'typeorm';
import { BookingStatus } from '../../enum';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookingTableTestHelper {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly repository: Repository<BookingEntity>,
  ) {}

  async addBooking({
    id = 'user-123',
    name = 'andi',
    email = 'andi@gmail.com',
    noTlp = '18129210231',
    date = '2023-10-09',
    startTime = '08:00',
    endTime = '09:00',
    status = BookingStatus.BOOKING,
    userId = '233bbbd8-c31e-47c5-b3cf-e75a02e6889c',
  }) {
    return await this.repository.save({
      name,
      email,
      date,
      noTlp,
      startTime,
      endTime,
      status,
      id,
      user: {
        id: userId,
      },
    });
  }

  async cleanTable() {
    return await this.repository.query('DELETE FROM booking WHERE 1=1');
  }
}
