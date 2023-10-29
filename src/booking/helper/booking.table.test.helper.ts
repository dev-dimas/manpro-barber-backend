import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BookingStatus } from '../../enum';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from '../entities/booking.entity';

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
    status = BookingStatus.BOOKING,
  }) {
    return await this.repository.save({
      name,
      email,
      date,
      noTlp,
      startTime,
      endTime,
      status,
      id,
    });
  }

  async getAllUser() {
    return await this.repository.find();
  }

  async findUserById(id: string) {
    return await this.repository.findOneBy({
      id,
    });
  }

  async deleteUserById(id: string) {
    return await this.repository.delete({
      id,
    });
  }

  async cleanTable() {
    return await this.repository.query('DELETE FROM booking WHERE 1=1');
  }
}
