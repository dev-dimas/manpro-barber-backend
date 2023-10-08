import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';
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
  @IsUUID('all')
  @IsString()
  barber: any;

  @IsOptional()
  @IsUUID('all')
  @IsString()
  employee: any;
}
