import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBarberDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: 'Barber Jaya',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: '082899083974',
  })
  no_tlp: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: 'Desa Jaya',
  })
  address: string;
}
