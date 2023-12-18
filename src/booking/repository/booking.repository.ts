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
        // status: BookingStatus.SUCCESS,
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
        status: BookingStatus.SUCCESS,
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
    return await this.repository
      .createQueryBuilder('booking')
      .select(['booking.*', 'service.name As "serviceName"'])
      .innerJoin('booking.service', 'service')
      .where('booking.user = :id', { id: userId })
      .orderBy('booking.date', 'DESC')
      .execute();
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

  async getRecapDayly(startDate: string, endDate: string) {
    return await this.repository
      .createQueryBuilder('booking')
      .select('booking.date As date')
      .addSelect('SUM(service.price) AS "total"')
      .innerJoin('booking.service', 'service')
      .where('booking.status = :status', { status: BookingStatus.SUCCESS })
      .andWhere('booking.date >= :startDate AND booking.date <= :endDate', {
        startDate,
        endDate,
      })
      .groupBy('booking.date')
      .orderBy('booking.date', 'ASC')
      .execute();
  }

  async getRecapWeekly(startDate: string, endDate: string) {
    return await this.repository
      .createQueryBuilder('booking')
      .select('EXTRACT(WEEK FROM booking.date) AS week')
      .addSelect('SUM(service.price) AS "total"')
      .innerJoin('booking.service', 'service')
      .where('booking.status = :status', { status: BookingStatus.SUCCESS })
      .andWhere('booking.date >= :startDate AND booking.date <= :endDate', {
        startDate,
        endDate,
      })
      .groupBy('week')
      .orderBy('week', 'ASC')
      .execute();
  }

  async getRecapMonthly(startDate: string, endDate: string) {
    return await this.repository
      .createQueryBuilder('booking')
      .select('EXTRACT(MONTH FROM booking.date) AS month')
      .addSelect('SUM(service.price) AS "total"')
      .innerJoin('booking.service', 'service')
      .where('booking.status = :status', { status: BookingStatus.SUCCESS })
      .andWhere('booking.date >= :startDate AND booking.date <= :endDate', {
        startDate,
        endDate,
      })
      .groupBy('month')
      .orderBy('month', 'ASC')
      .execute();
  }

  async getRecapYearly(startDate: string, endDate: string) {
    return await this.repository
      .createQueryBuilder('booking')
      .select('EXTRACT(YEAR FROM booking.date) AS year')
      .addSelect('SUM(service.price) AS "total"')
      .innerJoin('booking.service', 'service')
      .where('booking.status = :status', { status: BookingStatus.SUCCESS })
      .andWhere('booking.date >= :startDate AND booking.date <= :endDate', {
        startDate,
        endDate,
      })
      .groupBy('year')
      .orderBy('year', 'ASC')
      .execute();
  }

  async getBookingByIdAndUserId(id: string, userId: string) {
    return await this.repository
      .createQueryBuilder('booking')
      .select([
        'booking.id As id',
        "TO_CHAR(booking.date, 'YYYY-MM-DD') As date",
        'booking.startTime As startTime',
        'booking.endTime As endTime',
        'booking.status As status',
        'booking.name As name',
        'booking.phone As phone',
        'booking.barberman As barberman',
        'service.name As "serviceName"',
        'service.price As "price"',
        'service.duration As "serviceDuration"',
      ])
      .innerJoin('booking.service', 'service')
      .where('booking.id = :id', { id })
      .andWhere('booking.user = :userId', { userId })
      .execute();
  }
}
