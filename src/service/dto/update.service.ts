import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateServiceDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    default: 'Barber Jaya',
  })
  name: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    default: 40000,
  })
  price: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    default: '00:40',
  })
  duration: string;
}
