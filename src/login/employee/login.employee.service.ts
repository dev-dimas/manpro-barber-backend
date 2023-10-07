import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginEmployeeDto } from './dto';
import * as argon2 from 'argon2';
import { EmployeeRepository } from '../../employee/repository/employee.repository';

@Injectable()
export class LoginEmployeeService {
  constructor(
    @InjectRepository(EmployeeRepository)
    private readonly employeeRepository: EmployeeRepository,
    private readonly jwtService: JwtService,
  ) {}

  async getLogged(loginEmployeeDto: LoginEmployeeDto) {
    const employee = await this.employeeRepository.getEmployeeByEmail(
      loginEmployeeDto.email,
    );

    if (!employee) {
      throw new HttpException('Invalid credentials!.', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordMatch = await argon2.verify(
      employee.password,
      loginEmployeeDto.password,
    );

    if (!isPasswordMatch) {
      throw new HttpException('Invalid credentials!.', HttpStatus.UNAUTHORIZED);
    }

    delete employee.password;
    const accessToken = await this.jwtService.signAsync({
      sub: employee.id,
      role: employee.role,
    });
    return { statusCode: HttpStatus.OK, accessToken };
  }
}
