import { Module } from '@nestjs/common';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';
import { EmployeeRepository } from '../employee/repository/employee.repository';
import { BarberRepository } from '../barber/repository/barber.repository';

@Module({
  controllers: [SeederController],
  providers: [SeederService, BarberRepository, EmployeeRepository],
})
export class SeederModule {}
