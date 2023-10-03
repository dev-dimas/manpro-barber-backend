import { Controller, Post, Body } from '@nestjs/common';
import { LoginEmployeeDto } from './dto';
import { LoginEmployeeService } from './login.employee.service';

@Controller('loginemployee')
export class LoginEmployeeController {
  constructor(private readonly loginEmployeeService: LoginEmployeeService) {}

  @Post()
  async login(@Body() loginEmployeeDto: LoginEmployeeDto) {
    return this.loginEmployeeService.getLogged(loginEmployeeDto);
  }
}
