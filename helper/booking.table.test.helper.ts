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
    email = 'andi@gmail.com',
    noTlp = '18129210231',
    date = '2023-10-09',
    startTime = '08:00',
    endTime = '09:00',
    barberman = 1,
    status = BookingStatus.BOOKING,
  }) {
    return await this.repository.save({
      name,
      email,
      date,
      noTlp,
      startTime,
      endTime,
      barberman,
      status,
      id,
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
