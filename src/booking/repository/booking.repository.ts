import { Injectable } from '@nestjs/common';
import { Repository, Brackets } from 'typeorm';
import { BookingStatus } from '../../enum';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from '../entities/booking.entity';
import { EmployeeCreateBookingDto, UserCreateBookingDto } from '../dto';
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
      .andWhere('booking.status = :status', { status: BookingStatus.BOOKING })
      // .andWhere('booking.status NOT IN (:...ids)', {
      //   ids: [BookingStatus.SUCCESS, BookingStatus.FAILED],
      // })
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

  async userAddBooking(
    userCreateBookingDto: UserCreateBookingDto,
    endTime: any,
    barberman: number,
    id: string,
  ) {
    return await this.repository
      .createQueryBuilder()
      .insert()
      .into(BookingEntity)
      .values({
        id,
        name: userCreateBookingDto.name,
        phone: userCreateBookingDto.phone,
        startTime: userCreateBookingDto.startTime,
        date: userCreateBookingDto.date,
        endTime,
        barberman,
        user: {
          id: userCreateBookingDto.userId,
        },
        service: { id: userCreateBookingDto.serviceId },
      })
      .returning('*')
      .execute();
  }

  async employeeAddBooking(
    employeeCreateBookingDto: EmployeeCreateBookingDto,
    endTime: any,
    barberman: number,
    id: string,
  ) {
    return await this.repository
      .createQueryBuilder()
      .insert()
      .into(BookingEntity)
      .values({
        id,
        name: employeeCreateBookingDto.name,
        startTime: employeeCreateBookingDto.startTime,
        date: employeeCreateBookingDto.date,
        status: BookingStatus.BOOKING,
        endTime,
        barberman,
        employee: {
          id: employeeCreateBookingDto.employeeId,
        },
        service: { id: employeeCreateBookingDto.serviceId },
      })
      .returning('*')
      .execute();
  }
}
