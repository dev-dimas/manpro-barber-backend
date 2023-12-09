import { HttpStatus, Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../employee/repository/employee.repository';
import { EmployeeRoleType, GenderType } from '../enum';
import * as argon2 from 'argon2';

@Injectable()
export class SeederService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async createSeeder() {
    const password1 = await argon2.hash('denny123');
    const password2 = await argon2.hash('fathola123');
    const password3 = await argon2.hash('helos123');

    await this.employeeRepository.addEmployee({
      name: 'Denny',
      phone: '085789023456',
      gender: GenderType.L,
      role: EmployeeRoleType.BARBERMAN,
      email: 'denny@gmail.com',
      password: password1,
    });

    await this.employeeRepository.addEmployee({
      name: 'Fathola',
      phone: '085789023457',
      gender: GenderType.L,
      role: EmployeeRoleType.BARBERMAN,
      email: 'fathola@gmail.com',
      password: password2,
    });

    await this.employeeRepository.addEmployee({
      name: 'Helos',
      phone: '085789023458',
      gender: GenderType.L,
      role: EmployeeRoleType.BARBERMAN,
      email: 'helos@gmail.com',
      password: password3,
    });

    return { statusCode: HttpStatus.CREATED };
  }
}
