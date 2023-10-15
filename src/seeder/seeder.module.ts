import { Module } from '@nestjs/common';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';
import { EmployeeRepository } from '../employee/repository/employee.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from '../employee/entities/employee.entity';

@Module({
  controllers: [SeederController],
  imports: [TypeOrmModule.forFeature([EmployeeEntity])],
  providers: [SeederService, EmployeeRepository],
})
export class SeederModule {}
