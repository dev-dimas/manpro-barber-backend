import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeeLoginDto, UserLoginDto } from './dto';
import * as argon2 from 'argon2';
import { UserRepository } from '../user/repository/user.repository';
import { EmployeeRepository } from '../employee/repository/employee.repository';

@Injectable()
export class LoginService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly employeeRepository: EmployeeRepository,
    private readonly jwtService: JwtService,
  ) {}

  async userGetLogged(userLoginDto: UserLoginDto) {
    const user = await this.userRepository.getUserByEmail(userLoginDto.email);

    if (!user) {
      throw new HttpException('Invalid credentials!.', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordMatch = await argon2.verify(
      user.password,
      userLoginDto.password,
    );

    if (!isPasswordMatch) {
      throw new HttpException('Invalid credentials!.', HttpStatus.UNAUTHORIZED);
    }

    delete user.password;
    const accessToken = userLoginDto.remember
      ? await this.jwtService.signAsync({ sub: { ...user }, role: 'user' })
      : await this.jwtService.signAsync(
          { sub: { ...user }, role: 'user' },
          { expiresIn: '1 days' },
        );
    return { statusCode: HttpStatus.OK, data: { accessToken } };
  }

  async employeeGetLogged(employeeLoginDto: EmployeeLoginDto) {
    const employee = await this.employeeRepository.getEmployeeByEmail(
      employeeLoginDto.email,
    );

    if (!employee) {
      throw new HttpException('Invalid credentials!.', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordMatch = await argon2.verify(
      employee.password,
      employeeLoginDto.password,
    );

    if (!isPasswordMatch) {
      throw new HttpException('Invalid credentials!.', HttpStatus.UNAUTHORIZED);
    }

    delete employee.password;
    const accessToken = await this.jwtService.signAsync({
      sub: { ...employee },
      role: employee.role,
    });
    return { statusCode: HttpStatus.OK, data: { accessToken } };
  }
}
