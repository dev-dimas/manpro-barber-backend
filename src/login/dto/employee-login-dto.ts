import { IsString, IsNotEmpty, IsEmail, IsBoolean } from 'class-validator';

export class EmployeeLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsBoolean()
  remember: boolean;
}
