import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto';
import dayjs from 'dayjs';
import { ServiceRepository } from '../service/repository/service.repository';
import { BookingRepository } from './repository/booking.repository';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly serviceRepository: ServiceRepository,
  ) {}

  async addBooking(createBookingDto: CreateBookingDto) {
    let endTime = dayjs(
      `${createBookingDto.date} ${createBookingDto.startTime}`,
    );

    const service = await this.serviceRepository.getServiceById(
      createBookingDto.service,
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

    if (numberOfBooking >= 3)
      return { statusCode: HttpStatus.CONFLICT, message: 'full' };
    return { statusCode: HttpStatus.CREATED };
  }
}
