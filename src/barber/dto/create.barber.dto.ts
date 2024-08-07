import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBarberDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: 'Barber Jaya',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    default: 3,
  })
  barber: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: '082899083974',
  })
  noTlp: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: 'Desa Jaya',
  })
  address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: '08:00',
  })
  open: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: '22:00',
  })
  closed: string;
}
