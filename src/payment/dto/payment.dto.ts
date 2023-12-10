import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class PaymentDto {
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
    default: '8ec5aa7b-09f8-4e80-9182-dc150811d8a3',
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
  @IsUUID('all')
  @ApiProperty({
    default: '8ec5aa7b-09f8-4e80-9182-dc150811d8a3',
  })
  serviceId: string;
}
