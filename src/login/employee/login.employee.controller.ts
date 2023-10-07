import { Controller, Post, Body } from '@nestjs/common';
import { LoginEmployeeDto } from './dto';
import { LoginEmployeeService } from './login.employee.service';
import { Public } from '../../decorator/public.decorator';

@Controller('loginemployee')
export class LoginEmployeeController {
  constructor(private readonly loginEmployeeService: LoginEmployeeService) {}

  @Public()
  @Post()
  async login(@Body() loginEmployeeDto: LoginEmployeeDto) {
    return this.loginEmployeeService.getLogged(loginEmployeeDto);
  }
}
