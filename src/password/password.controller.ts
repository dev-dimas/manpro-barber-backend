import { Body, Controller, Patch } from '@nestjs/common';
import { PasswordService } from './password.service';
import { Public, Roles } from '../decorator';
import { Role } from '../enum';
import { ChangePasswordDto, ForgotPasswordDto } from './dto';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Public()
  @Patch('forgot')
  fotgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.passwordService.forgotPassword(forgotPasswordDto);
  }

  @Roles(Role.USER)
  @Patch('change')
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.passwordService.changePassword(changePasswordDto);
  }
}
