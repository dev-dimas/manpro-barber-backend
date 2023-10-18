import { HttpStatus, Injectable } from '@nestjs/common';
import { BookingRepository } from './repository';
import { CreateBookingDto } from './dto';
import dayjs from 'dayjs';
import { ServiceRepository } from '../service/repository/service.repository';

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
    for (let i = 0; i < createBookingDto.service.length; i++) {
      const service = await this.serviceRepository.getServiceById(
        createBookingDto.service[i],
      );
      const duration = dayjs(`${createBookingDto.date} ${service.duration}`);
      endTime = endTime
        .add(Number(duration.format('H')), 'h')
        .add(Number(duration.format('m')), 'm');
    }

    const numberOfBooking =
      this.bookingRepository.countBookingByRangeStartEndTime(
        createBookingDto.startTime,
        endTime.format('HH:mm'),
        createBookingDto.date,
      );

    console.log(createBookingDto.date);
    console.log(numberOfBooking);
    return { statusCode: HttpStatus.CREATED };
  }
}
