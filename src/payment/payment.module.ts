import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { BookingService } from '../booking/booking.service';
import { UserRepository } from '../user/repository/user.repository';
import { ServiceRepository } from '../service/repository/service.repository';
import { UserEntity } from '../user/entities/user.entity';
import { ServiceEntity } from '../service/entities/service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from '../booking/entities/booking.entity';
import { EmployeeEntity } from '../employee/entities/employee.entity';
import { BookingRepository } from '../booking/repository/booking.repository';
import { EmployeeRepository } from '../employee/repository/employee.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookingEntity,
      UserEntity,
      ServiceEntity,
      EmployeeEntity,
    ]),
  ],
  providers: [
    PaymentService,
    BookingService,
    BookingRepository,
    UserRepository,
    ServiceRepository,
    EmployeeRepository,
  ],
  controllers: [PaymentController],
})
export class PaymentModule {}
