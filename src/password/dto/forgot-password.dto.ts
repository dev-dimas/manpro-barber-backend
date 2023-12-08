import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    default: 'andi@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    default: 'andi54321',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({
    default: 'andi54321',
  })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}
