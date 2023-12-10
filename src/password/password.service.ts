import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { UserRepository } from '../user/repository/user.repository';
import { ChangePasswordDto, ForgotPasswordDto } from './dto';

@Injectable()
export class PasswordService {
  constructor(private readonly userRepository: UserRepository) {}

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const user = await this.userRepository.getUserById(
      changePasswordDto.userId,
    );
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const currentPassword = await argon2.verify(
      user.password,
      changePasswordDto.currentPassword,
    );
    if (!currentPassword)
      throw new BadRequestException('Current password not valid');

    const newPassword = await argon2.verify(
      user.password,
      changePasswordDto.newPassword,
    );
    if (newPassword)
      throw new BadRequestException(
        'New password must be different from the previous password',
      );

    if (changePasswordDto.newPassword !== changePasswordDto.confirmPassword)
      throw new BadRequestException(
        'The new password and confirm password do not match',
      );

    changePasswordDto.newPassword = await argon2.hash(
      changePasswordDto.newPassword,
    );

    await this.userRepository.changePassword(
      user.id,
      changePasswordDto.newPassword,
    );

    return { statusCode: HttpStatus.OK };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const email = await this.userRepository.getUserByEmail(
      forgotPasswordDto.email,
    );
    if (!email)
      throw new HttpException('Email not found', HttpStatus.NOT_FOUND);

    if (forgotPasswordDto.newPassword !== forgotPasswordDto.confirmPassword)
      throw new BadRequestException(
        'The new password and confirm password do not match',
      );

    forgotPasswordDto.newPassword = await argon2.hash(
      forgotPasswordDto.newPassword,
    );

    await this.userRepository.changePassword(
      email.id,
      forgotPasswordDto.newPassword,
    );

    return { statusCode: HttpStatus.OK };
  }
}
