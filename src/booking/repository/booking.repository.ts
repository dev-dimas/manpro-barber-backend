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

  async userAddBooking(userCreateBookingDto: UserCreateBookingDto, id: string) {
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
        endTime: userCreateBookingDto.endTime,
        barberman: userCreateBookingDto.barberman,
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
    barberman: string,
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

  async updateBookingStatus(id: string, employeeId: string) {
    return await this.repository
      .createQueryBuilder()
      .update(BookingEntity)
      .set({
        status: BookingStatus.SUCCESS,
        employee: {
          id: employeeId,
        },
      })
      .where('id = :id', { id })
      .returning('*')
      .execute();
  }

  async getBookingById(id: string) {
    return await this.repository.findOneBy({
      id,
    });
  }

  async getAllBookingByStatusBookingAndDate(date: string) {
    return await this.repository.find({
      where: { status: BookingStatus.BOOKING, date },
    });
  }

  async getAllBookingByDate(date: string) {
    return await this.repository
      .createQueryBuilder('booking')
      .select(
        'booking.date, booking.startTime, booking.userId, booking.serviceId, booking.name',
      )
      .where('booking.date = :date', { date })
      .orderBy('booking.startTime', 'ASC')
      .execute();
  }

  async getAllBookingByUserId(userId: string) {
    return await this.repository.find({
      where: { user: { id: userId } },
      order: { date: 'DESC' },
      take: 10,
    });
  }

  async countAllBookingSuccesByUserId(userId: string) {
    return await this.repository.count({
      where: { user: { id: userId }, status: BookingStatus.SUCCESS },
    });
  }

  async getLastTimeHaircut(userId: string) {
    return await this.repository.find({
      where: { user: { id: userId }, status: BookingStatus.SUCCESS },
      order: { date: 'DESC' },
      take: 1,
    });
  }
}
