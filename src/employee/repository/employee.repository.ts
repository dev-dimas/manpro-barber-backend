import { Repository } from 'typeorm';
import { EmployeeEntity } from '../entities/employee.entity';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeRoleType } from '../../enum';

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
    return await this.repository.findOneBy({ id });
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

  async countEmployeeInCharge() {
    return await this.repository.count({
      where: {
        isIncharge: true,
        role: EmployeeRoleType.ADMIN,
      },
    });
  }
}
