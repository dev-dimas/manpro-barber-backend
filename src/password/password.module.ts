import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { UserRepository } from '../user/repository/user.repository';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [PasswordController],
  providers: [PasswordService, UserRepository],
})
export class PasswordModule {}
