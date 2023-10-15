import { Repository } from 'typeorm';
import { EmployeeEntity } from '../entities/employee.entity';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmployeeRepository {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly repository: Repository<EmployeeEntity>,
  ) {}

  async addEmployee(employee: CreateEmployeeDto) {
    return await this.repository.save(employee);
  }

  async getAllEmployee() {
    return await this.repository.find();
  }

  async getEmployeeById(id: string) {
    return await this.repository.query('Select * From employee Where id = $1', [
      id,
    ]);
  }

  async getEmployeeByEmail(email: string) {
    return await this.repository.findOneBy({
      email,
    });
  }

  async updateEmployeeById(id: string, employee: UpdateEmployeeDto) {
    return await this.repository
      .createQueryBuilder()
      .update(EmployeeEntity)
      .set(employee)
      .where('id = :id', { id })
      .returning('*')
      .execute();
  }

  async deleteEmployeeById(id: string) {
    return await this.repository.delete({
      id,
    });
  }
}
