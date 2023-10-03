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
    default: 30000,
  })
  price: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: '00:40',
  })
  duration: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    default: 1,
  })
  barber: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    default: 1,
  })
  employee: number;
}
