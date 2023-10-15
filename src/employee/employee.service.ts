import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto';
import * as argon2 from 'argon2';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeRepository } from './repository/employee.repository';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async createEmployee(createEmployeeDto: CreateEmployeeDto, user: any) {
    const employee = await this.getEmployee(user.sub);

    if (!employee)
      throw new HttpException(`Employee not found`, HttpStatus.NOT_FOUND);

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

  async updateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    if (updateEmployeeDto.password) {
      updateEmployeeDto.password = await argon2.hash(
        updateEmployeeDto.password,
      );
    }
    const employee = await this.employeeRepository.updateEmployeeById(
      id,
      updateEmployeeDto,
    );

    if (employee.affected == 0)
      throw new HttpException(`Employee not found`, HttpStatus.NOT_FOUND);

    return { statusCode: HttpStatus.OK, data: employee.raw[0] };
  }

  async getEmployee(id: string) {
    const employee = await this.employeeRepository.getEmployeeById(id);

    if (!employee)
      throw new HttpException(`Employee not found`, HttpStatus.NOT_FOUND);

    return { statusCode: HttpStatus.OK, data: employee };
  }

  async deleteEmployee(id: string) {
    const employee = await this.employeeRepository.deleteEmployeeById(id);

    if (employee.affected == 0)
      throw new HttpException(`Employee not found`, HttpStatus.NOT_FOUND);

    return { statusCode: HttpStatus.OK, data: employee.raw[0] };
  }

  async getAllEmployee() {
    const employee = await this.employeeRepository.getAllEmployee();
    return { statusCode: HttpStatus.OK, data: employee };
  }
}
