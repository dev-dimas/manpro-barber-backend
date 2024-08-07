import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class DateDto {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    default: '2023-10-09',
  })
  date: string;
}
