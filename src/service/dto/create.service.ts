import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  IsMilitaryTime,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: 'Potong',
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
  @IsMilitaryTime()
  @ApiProperty({
    default: '00:40',
  })
  duration: string;

  @IsOptional()
  @IsUUID('all')
  @IsString()
  employee: any;
}
