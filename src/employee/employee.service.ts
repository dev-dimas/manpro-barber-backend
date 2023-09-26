import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto } from './dto';
import * as argon2 from 'argon2';
import { EmployeeRepository } from './repository/employee.repository';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeRepository)
    private readonly employeeRepository: EmployeeRepository,
  ) {}

  async createEmployee(createEmployeeDto: CreateEmployeeDto) {
    const isEmailExist = await this.employeeRepository.getEmployeeByEmail(
      createEmployeeDto.email,
    );

    if (isEmailExist) {
      throw new HttpException(
        `Email @${createEmployeeDto.email} is already taken!.`,
        HttpStatus.CONFLICT,
      );
    }

    createEmployeeDto.password = await argon2.hash(createEmployeeDto.password);
    const newEmployee = await this.employeeRepository.addEmployee(
      createEmployeeDto,
    );
    delete newEmployee.password;
    return { statusCode: HttpStatus.CREATED, data: newEmployee };
  }
}
