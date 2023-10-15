import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from './entities/service.entity';
import { ServiceRepository } from './repository/service.repository';
import { EmployeeRepository } from '../employee/repository/employee.repository';
import { EmployeeEntity } from '../employee/entities/employee.entity';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService, ServiceRepository, EmployeeRepository],
  imports: [TypeOrmModule.forFeature([ServiceEntity, EmployeeEntity])],
  exports: [ServiceRepository],
})
export class ServiceModule {}
