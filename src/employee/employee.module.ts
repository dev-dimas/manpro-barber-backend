import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRepository } from './repository/employee.repository';
import { EmployeeEntity } from './entities/employee.entity';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository, JwtService, Reflector],
  imports: [TypeOrmModule.forFeature([EmployeeEntity])],
  exports: [EmployeeRepository],
})
export class EmployeeModule {}
