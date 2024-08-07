import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    default: '25769c6c-d34d-4bfe-ba98-e0ee856f3e7a',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    default: 'andi12345',
  })
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @ApiProperty({
    default: 'andi54321',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({
    default: 'andi54321',
  })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}
