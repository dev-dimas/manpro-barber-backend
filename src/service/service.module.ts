import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from './entities/service.entity';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService],
  imports: [TypeOrmModule.forFeature([ServiceEntity])],
})
export class ServiceModule {}
