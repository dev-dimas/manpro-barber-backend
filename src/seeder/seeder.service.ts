import { HttpStatus, Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../employee/repository/employee.repository';
import { EmployeeRoleType, GenderType } from '../enum';
import * as argon2 from 'argon2';
import { ServiceRepository } from '../service/repository/service.repository';

@Injectable()
export class SeederService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly serviceRepository: ServiceRepository,
  ) {}

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

    const services = [
      {
        name: 'Bossman Haircut',
        price: 35000,
        duration: '00:45:00',
        information:
          'Consultation, Haircut, Washing, Vitamin, Styling Hot Towel, Massage',
      },
      {
        name: 'BOSS BABBY HAIRCUT',
        price: 30000,
        duration: '00:45:00',
        information: 'Only 0-12th',
      },
      {
        name: 'HAIRLIGHT BASIC',
        price: 150000,
        duration: '02:00:00',
        information: 'Only Bieacing',
      },
      {
        name: 'HAIRLIGHT COLOUR',
        price: 200000,
        duration: '02:00:00',
        information:
          'Consultation, Haircut, Washing, Vitamin, Styling Hot Towel, Massage',
      },
      {
        name: 'FULL COLOUR',
        price: 300000,
        duration: '02:00:00',
        information: 'Couloring by Matrix',
      },
      {
        name: 'BLACK HAIR',
        price: 65000,
        duration: '02:00:00',
        information: null,
      },
      {
        name: 'PERM or CURLY',
        price: 200000,
        duration: '02:00:00',
        information: 'By Appointment Only',
      },
    ];

    await this.serviceRepository.addManyService(services);

    return { statusCode: HttpStatus.CREATED };
  }
}
