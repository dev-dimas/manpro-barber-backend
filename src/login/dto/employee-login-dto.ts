import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class EmployeeLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
