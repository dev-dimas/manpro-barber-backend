import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRepository } from './repository/employee.repository';
import { EmployeeEntity } from './entities/employee.entity';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository],
  imports: [TypeOrmModule.forFeature([EmployeeEntity])],
})
export class EmployeeModule {}
