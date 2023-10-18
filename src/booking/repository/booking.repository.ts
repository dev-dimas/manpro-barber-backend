import { Injectable } from '@nestjs/common';
import { BookingEntity } from '../entities';
import { Repository, Brackets } from 'typeorm';
import { BookingStatus } from '../../enum';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class BookingRepository {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly repository: Repository<BookingEntity>,
  ) {}

  async countBookingByRangeStartEndTime(
    startTime: string,
    endTime: string,
    date: Date,
  ) {
    return await this.repository
      .createQueryBuilder('booking')
      .where('booking.date = :date', { date })
      .andWhere('booking.status NOT IN (:...ids)', {
        ids: [BookingStatus.SUCCESS, BookingStatus.FAILED],
      })
      .andWhere(
        new Brackets((qb) => {
          qb.where('booking.startTime between :startTime and :endTime', {
            startTime,
            endTime,
          }).orWhere('booking.endTime between :startTime and :endTime', {
            startTime,
            endTime,
          });
        }),
      )
      .getCount();
  }
}
