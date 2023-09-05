import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from './dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() loginDto: LoginDto) {
    return this.loginService.getLogged(loginDto);
  }
}
