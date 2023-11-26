import { Controller, Post, Body } from '@nestjs/common';
import { EmployeeLoginDto, UserLoginDto } from './dto';
import { LoginService } from './login.service';
import { Public } from '../decorator';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Public()
  @Post('user')
  async loginUser(@Body() userLoginDto: UserLoginDto) {
    return this.loginService.userGetLogged(userLoginDto);
  }

  @Public()
  @Post('employee')
  async loginEmployee(@Body() employeeLoginDto: EmployeeLoginDto) {
    return this.loginService.employeeGetLogged(employeeLoginDto);
  }
}
