import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GenderType, EmployeeRoleType } from '../../enum';

export class UpdateEmployeeDto {
  @IsString()
  @IsEmail()
  @IsOptional()
  @ApiProperty({
    default: 'email@gmail.com',
  })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    default: 'andi',
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    default: 'andi12345',
  })
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    default: '019302392839',
  })
  noTlp: string;

  @IsOptional()
  @IsString()
  @IsEnum(GenderType)
  @ApiProperty({
    default: 'l',
  })
  gender: GenderType;

  @IsString()
  @IsOptional()
  @IsEnum(EmployeeRoleType)
  @ApiProperty({
    default: 'admin',
  })
  role: EmployeeRoleType;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    default: true,
  })
  isIncharge: boolean;
}
