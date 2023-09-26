import { DataSource, Repository } from 'typeorm';
import { EmployeeEntity } from '../entities/employee.entity';
import { CreateEmployeeDto } from '../dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeRepository extends Repository<EmployeeEntity> {
  constructor(private dataSource: DataSource) {
    super(EmployeeEntity, dataSource.createEntityManager());
  }
  async addEmployee(employee: CreateEmployeeDto) {
    return await this.save(employee);
  }

  async getEmployeeByEmail(email: string) {
    return await this.findOneBy({
      email,
    });
  }
}
