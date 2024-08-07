import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class UserCreateBookingDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: 'Rudi',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: '098765435778',
  })
  phone: string;

  @IsNotEmpty()
  @IsUUID('all')
  @ApiProperty({
    default: '098765435778',
  })
  userId: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    default: '2023-10-09',
  })
  date: string;

  @IsNotEmpty()
  @IsMilitaryTime()
  @ApiProperty({
    default: '09:00',
  })
  startTime: string;

  @IsNotEmpty()
  @IsMilitaryTime()
  @ApiProperty({
    default: '09:00',
  })
  endTime: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: 'Helos',
  })
  barberman: string;

  @IsNotEmpty()
  @IsUUID('all')
  @ApiProperty({
    default: 'serviceId',
  })
  serviceId: string;
}
