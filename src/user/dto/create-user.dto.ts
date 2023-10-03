import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    default: 'andi123',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    default: 'andi@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    default: 'andi',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    default: 'andi1234',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    default: '087123456789',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;
}
