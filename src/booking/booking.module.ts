import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceRepository } from '../service/repository/service.repository';
import { ServiceEntity } from '../service/entities/service.entity';
import { BookingRepository } from './repository/booking.repository';
import { BookingEntity } from './entities/booking.entity';

@Module({
  controllers: [BookingController],
  providers: [BookingService, BookingRepository, ServiceRepository],
  imports: [TypeOrmModule.forFeature([BookingEntity, ServiceEntity])],
  exports: [BookingService, BookingRepository],
})
export class BookingModule {}
