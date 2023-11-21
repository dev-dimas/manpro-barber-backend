import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from '../src/employee/entities/employee.entity';
import { EmployeeRoleType, GenderType } from '../src/enum';

@Injectable()
export class EmployeeTableTestHelper {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly repository: Repository<EmployeeEntity>,
  ) {}

  async addEmployee({
    name = 'andi',
    email = 'andi@gmail.com',
    noTlp = '18129210231',
    password = 'andi12345',
    gender = GenderType.L,
    role = EmployeeRoleType.ADMIN,
    isIncharge = true,
  }) {
    return await this.repository.save({
      name,
      email,
      noTlp,
      password,
      gender,
      role,
      isIncharge,
    });
  }

  async getAllEmployee() {
    return await this.repository.find();
  }

  async findEmployeeById(id: string) {
    return await this.repository.findOneBy({
      id,
    });
  }

  async deleteEmployeeById(id: string) {
    return await this.repository.delete({
      id,
    });
  }

  async cleanTable() {
    return await this.repository.query('DELETE FROM employee WHERE 1=1');
  }
}
