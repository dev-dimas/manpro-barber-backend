import { Module } from '@nestjs/common';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';
import { EmployeeRepository } from '../employee/repository/employee.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from '../employee/entities/employee.entity';
import { ServiceEntity } from '../service/entities/service.entity';
import { ServiceRepository } from '../service/repository/service.repository';

@Module({
  controllers: [SeederController],
  imports: [TypeOrmModule.forFeature([EmployeeEntity, ServiceEntity])],
  providers: [SeederService, EmployeeRepository, ServiceRepository],
})
export class SeederModule {}
