import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GenderType, EmployeeRoleType } from '../../enum';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    default: 'email@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: 'andi',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: 'andi12345',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: '019302392839',
  })
  noTlp: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(GenderType)
  @ApiProperty({
    default: 'l',
  })
  gender: GenderType;

  @IsNotEmpty()
  @IsString()
  @IsEnum(EmployeeRoleType)
  @ApiProperty({
    default: 'admin',
  })
  role: EmployeeRoleType;
}
