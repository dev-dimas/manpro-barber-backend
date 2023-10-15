import { HttpStatus, Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../employee/repository/employee.repository';
import { EmployeeRoleType, GenderType } from '../enum';
import * as argon2 from 'argon2';

@Injectable()
export class SeederService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async createSeeder() {
    const password = await argon2.hash('andi123');

    const employee = await this.employeeRepository.addEmployee({
      name: 'Andi',
      noTlp: '013298039',
      gender: GenderType.L,
      role: EmployeeRoleType.OWNER,
      email: 'andi@gmail.com',
      password: password,
    });

    return { statusCode: HttpStatus.CREATED, data: { employee } };
  }
}
