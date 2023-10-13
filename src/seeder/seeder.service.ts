import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BarberRepository } from '../barber/repository/barber.repository';
import { EmployeeRepository } from '../employee/repository/employee.repository';
import { EmployeeRoleType, GenderType } from '../enum';
import * as argon2 from 'argon2';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(BarberRepository)
    @InjectRepository(EmployeeRepository)
    private readonly barberRepository: BarberRepository,
    private readonly employeeRepository: EmployeeRepository,
  ) {}

  async createSeeder() {
    const barber = await this.barberRepository.addBarber({
      name: 'barber',
      noTlp: '02930299303',
      address: 'surabaya',
      open: '08:00',
      closed: '20:00',
      barber: 3,
    });

    const password = await argon2.hash('andi123');

    const employee = await this.employeeRepository.addEmployee({
      name: 'Andi',
      noTlp: '013298039',
      gender: GenderType.L,
      role: EmployeeRoleType.OWNER,
      email: 'andi@gmail.com',
      password: password,
      barber: barber.id,
    });

    return { statusCode: HttpStatus.CREATED, data: { barber, employee } };
  }

  async deleteSeeder() {
    await this.barberRepository.query('truncate barbershop cascade');

    return { statusCode: HttpStatus.OK };
  }
}
