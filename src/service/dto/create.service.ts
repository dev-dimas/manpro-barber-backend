import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
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

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  barber: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  employee: string;
}
