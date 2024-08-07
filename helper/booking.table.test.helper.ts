import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BookingStatus } from '../src/enum';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from '../src/booking/entities/booking.entity';

@Injectable()
export class BookingTableTestHelper {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly repository: Repository<BookingEntity>,
  ) {}

  async addBooking({
    id = 'booking-123',
    name = 'andi',
    noTlp = '18129210231',
    date = '2023-10-09',
    startTime = '08:00',
    phone = '087908789000',
    endTime = '09:00',
    barberman = 'Helos',
    status = BookingStatus.BOOKING,
    serviceId = 'serviceId',
    userId = null,
    employeeId = null,
  }) {
    return await this.repository.save({
      name,
      date,
      noTlp,
      startTime,
      endTime,
      barberman,
      phone,
      status,
      id,
      user: {
        id: userId,
      },
      employee: {
        id: employeeId,
      },
      service: {
        id: serviceId,
      },
    });
  }

  async getAllBooking() {
    return await this.repository.find();
  }

  async findBookingById(id: string) {
    return await this.repository.find({ where: { id }, loadRelationIds: true });
  }

  async deleteBookingById(id: string) {
    return await this.repository.delete({
      id,
    });
  }

  async cleanTable() {
    return await this.repository.query('DELETE FROM booking WHERE 1=1');
  }
}
