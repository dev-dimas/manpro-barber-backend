import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsMilitaryTime,
  IsOptional,
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
  @IsString()
  @ApiProperty({
    default: 'information',
  })
  information: string | null;
}
