import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsEmail,
  IsString,
  IsEnum,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { GenderType } from '../../enum';
export class UpdateUserDto {
  @ApiProperty({
    default: 'andi@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    default: 'andi',
  })
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    default: '087123456789',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    default: 'l',
  })
  @IsOptional()
  @IsString()
  @IsEnum(GenderType)
  gender: GenderType | null;

  @ApiProperty({
    default: '2023-10-09',
  })
  @IsOptional()
  @IsDateString()
  birthdayDate: string | null;

  @ApiProperty({
    default: 'string',
  })
  @IsOptional()
  @IsString()
  address: string | null;
}
