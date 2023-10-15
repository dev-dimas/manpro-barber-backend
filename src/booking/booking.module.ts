import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity, DetailBookingEntity } from './entities';
import { BookingRepository, DetailBookingRepository } from './repository';
import { ServiceRepository } from '../service/repository/service.repository';
import { ServiceEntity } from '../service/entities/service.entity';

@Module({
  controllers: [BookingController],
  providers: [BookingService, BookingRepository, ServiceRepository],
  imports: [
    TypeOrmModule.forFeature([
      BookingEntity,
      DetailBookingEntity,
      ServiceEntity,
    ]),
  ],
  exports: [BookingService, BookingRepository],
})
export class BookingModule {}
