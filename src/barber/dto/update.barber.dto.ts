import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBarberDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    default: 'Barber Jaya',
  })
  name: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    default: 3,
  })
  barber: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    default: '082899083974',
  })
  noTlp: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    default: 'Desa Jaya',
  })
  address: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    default: '08:00',
  })
  open: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    default: '21:00',
  })
  closed: string;
}
