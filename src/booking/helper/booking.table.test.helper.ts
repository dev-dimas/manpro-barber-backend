import { Injectable } from '@nestjs/common';
import { BookingEntity } from '../entities';
import { Repository, DataSource } from 'typeorm';
import { BookingStatus } from '../../enum';

@Injectable()
export class BookingTableTestHelper extends Repository<BookingEntity> {
  constructor(private dataSource: DataSource) {
    super(BookingEntity, dataSource.createEntityManager());
  }

  async addBooking({
    id = 'user-123',
    name = 'andi',
    email = 'andi@gmail.com',
    noTlp = '18129210231',
    date = '2023-04-20',
    startTime = '08:00',
    endTime = '09:00',
    status = BookingStatus.BOOKING,
    userId = '1298293812',
    barberId = '983208333',
  }) {
    return await this.query(
      'INSERT INTO booking VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
      [
        name,
        email,
        noTlp,
        date,
        startTime,
        endTime,
        status,
        userId,
        barberId,
        id,
      ],
    );
  }

  async cleanTable() {
    return await this.query('DELETE FROM booking WHERE 1=1');
  }
}
