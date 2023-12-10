import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceRepository } from '../service/repository/service.repository';
import { ServiceEntity } from '../service/entities/service.entity';
import { BookingRepository } from './repository/booking.repository';
import { BookingEntity } from './entities/booking.entity';
import { EmployeeRepository } from '../employee/repository/employee.repository';
import { EmployeeEntity } from '../employee/entities/employee.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UserRepository } from '../user/repository/user.repository';

@Module({
  controllers: [BookingController],
  providers: [
    BookingService,
    BookingRepository,
    ServiceRepository,
    EmployeeRepository,
    UserRepository,
  ],
  imports: [
    TypeOrmModule.forFeature([
      BookingEntity,
      ServiceEntity,
      EmployeeEntity,
      UserEntity,
    ]),
  ],
  exports: [BookingService, BookingRepository],
})
export class BookingModule {}
