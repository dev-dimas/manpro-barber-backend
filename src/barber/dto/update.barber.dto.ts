import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBarberDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    default: 'Barber Jaya',
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    default: '082899083974',
  })
  no_tlp: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    default: 'Desa Jaya',
  })
  address: string;
}
