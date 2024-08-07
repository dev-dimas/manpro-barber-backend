import { Module } from '@nestjs/common';
import { BarberController } from './barber.controller';
import { BarberService } from './barber.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarberEntity } from './entities/barber.entity';
import { BarberRepository } from './repository/barber.repository';

@Module({
  controllers: [BarberController],
  providers: [BarberService, BarberRepository],
  imports: [TypeOrmModule.forFeature([BarberEntity])],
  exports: [BarberRepository],
})
export class BarberModule {}
