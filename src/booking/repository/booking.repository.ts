import { Injectable } from '@nestjs/common';
import { BookingEntity } from '../entities';
import { Repository, Between, Not } from 'typeorm';
import { BookingStatus } from '../../enum';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class BookingRepository {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly repository: Repository<BookingEntity>,
  ) {}

  async getBookingByRangeStartEndTime(
    startTime: string,
    endTime: string,
    date: Date,
  ) {
    return await this.repository.count({
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
