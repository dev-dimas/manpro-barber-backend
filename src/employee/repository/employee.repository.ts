import { DataSource, Repository } from 'typeorm';
import { EmployeeEntity } from '../entities/employee.entity';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeRepository extends Repository<EmployeeEntity> {
  constructor(private dataSource: DataSource) {
    super(EmployeeEntity, dataSource.createEntityManager());
  }

  async addEmployee(employee: CreateEmployeeDto) {
    return await this.save(employee);
  }

  async getAllEmployee() {
    return await this.find();
  }

  async getEmployeeById(id: string) {
    return await this.findOneBy({
      id,
    });
  }

  async getEmployeeByEmail(email: string) {
    return await this.findOneBy({
      email,
    });
  }

  async updateEmployeeById(id: string, employee: UpdateEmployeeDto) {
    return await this.createQueryBuilder()
      .update(EmployeeEntity)
      .set(employee)
      .where('id = :id', { id })
      .returning('*')
      .execute();
  }

  async deleteEmployeeById(id: string) {
    return await this.delete({
      id,
    });
  }
}
