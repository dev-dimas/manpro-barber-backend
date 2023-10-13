import { Injectable } from '@nestjs/common';
import { BookingEntity } from '../entities';
import { Repository, DataSource, Between, Not } from 'typeorm';
import { BookingStatus } from '../../enum';

@Injectable()
export class BookingRepository extends Repository<BookingEntity> {
  constructor(private dataSource: DataSource) {
    super(BookingEntity, dataSource.createEntityManager());
  }

  async getBookingByRangeStartEndTime(
    startTime: string,
    endTime: string,
    date: Date,
  ) {
    return await this.count({
      where: [
        {
          startTime: Between(startTime, endTime),
          endTime: Between(startTime, endTime),
        },
        {
          date,
        },
        {
          status: Not(BookingStatus.SUCCESS),
        },
        {
          status: Not(BookingStatus.FAILED),
        },
      ],
    });
  }
}
