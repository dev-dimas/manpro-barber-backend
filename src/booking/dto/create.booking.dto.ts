import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: 'Bambang',
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    default: 'Bambang@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: '0392024330',
  })
  noTlp: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    default: '2023-10-09',
  })
  date: Date;

  @IsNotEmpty()
  @IsMilitaryTime()
  @ApiProperty({
    default: '09:00',
  })
  startTime: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    default: ['serviceId'],
  })
  service: Array<string>;
}
