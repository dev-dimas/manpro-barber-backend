import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginEmployeeDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
