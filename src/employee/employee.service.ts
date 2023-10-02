import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto } from './dto';
import * as argon2 from 'argon2';
import { EmployeeRepository } from './repository/employee.repository';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

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

  async updateEmployee(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    updateEmployeeDto.password = await argon2.hash(updateEmployeeDto.password);
    const employee = await this.employeeRepository.updateEmployeeById(
      id,
      updateEmployeeDto,
    );

    if (employee.affected == 0)
      throw new HttpException(`Id employee not found`, HttpStatus.NOT_FOUND);

    return { statusCode: HttpStatus.OK, data: employee.raw[0] };
  }

  async getEmployee(id: number) {
    const employee = await this.employeeRepository.getEmployeeById(id);

    if (!employee)
      throw new HttpException(`Id employee not found`, HttpStatus.NOT_FOUND);

    return { statusCode: HttpStatus.OK, data: employee };
  }

  async deleteEmployee(id: number) {
    const employee = await this.employeeRepository.deleteEmployeeById(id);

    if (employee.affected == 0)
      throw new HttpException(`Id employee not found`, HttpStatus.NOT_FOUND);

    return { statusCode: HttpStatus.OK, data: employee.raw[0] };
  }

  async getAllEmployee() {
    const employee = await this.employeeRepository.getAllEmployee();
    return { statusCode: HttpStatus.OK, data: employee };
  }
}