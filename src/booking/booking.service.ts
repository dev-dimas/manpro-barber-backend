import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto';
import dayjs from 'dayjs';
import { ServiceRepository } from '../service/repository/service.repository';
import { BookingRepository } from './repository/booking.repository';
import { EmployeeRepository } from '../employee/repository/employee.repository';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly serviceRepository: ServiceRepository,
    private readonly employeeRepository: EmployeeRepository,
  ) {}

  async addBooking(createBookingDto: CreateBookingDto, user: any) {
    const service = await this.serviceRepository.getServiceById(
      createBookingDto.service,
    );

    const employeeInCharge =
      await this.employeeRepository.countEmployeeInCharge();

    let endTime = dayjs(
      `${createBookingDto.date} ${createBookingDto.startTime}`,
    );

    const duration = dayjs(`${createBookingDto.date} ${service.duration}`);

    endTime = endTime
      .add(Number(duration.format('H')), 'h')
      .add(Number(duration.format('m')), 'm');

    const numberOfBooking =
      await this.bookingRepository.countBookingByRangeStartEndTime(
        createBookingDto.startTime,
        endTime.format('HH:mm'),
        createBookingDto.date,
      );

    if (numberOfBooking >= employeeInCharge)
      return { statusCode: HttpStatus.CONFLICT, message: 'full' };

    const booking = await this.bookingRepository.addBooking(
      createBookingDto,
      endTime,
      user?.id,
      dayjs().toISOString(),
    );

    return { statusCode: HttpStatus.CREATED, data: booking };
  }
}
