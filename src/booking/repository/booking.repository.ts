import { Injectable } from '@nestjs/common';
import { Repository, Brackets } from 'typeorm';
import { BookingStatus } from '../../enum';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from '../entities/booking.entity';
import { CreateBookingDto } from '../dto';
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

  async addBooking(
    createBookingDto: CreateBookingDto,
    endTime: any,
    userId: string = null,
    barberman: number,
    id: string,
  ) {
    return await this.repository.insert({
      id,
      name: createBookingDto.name,
      email: createBookingDto.email,
      noTlp: createBookingDto.noTlp,
      date: createBookingDto.date,
      startTime: createBookingDto.startTime,
      endTime,
      barberman,
      user: {
        id: userId,
      },
      service: { id: createBookingDto.service },
    });
  }
}
