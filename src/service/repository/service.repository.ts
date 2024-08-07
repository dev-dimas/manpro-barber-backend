import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ServiceEntity } from '../entities/service.entity';
import { CreateServiceDto, UpdateServiceDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ServiceRepository {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly repository: Repository<ServiceEntity>,
  ) {}

  async addService(service: CreateServiceDto) {
    return await this.repository.save(service);
  }

  async addManyService(service: any) {
    return await this.repository
      .createQueryBuilder()
      .insert()
      .into(ServiceEntity)
      .values(service)
      .returning('*')
      .execute();
  }

  async getAllService() {
    return await this.repository.find();
  }

  async getServiceById(id: string) {
    return await this.repository.findOneBy({
      id,
    });
  }

  async updateServiceById(id: string, service: UpdateServiceDto) {
    return await this.repository
      .createQueryBuilder()
      .update(ServiceEntity)
      .set(service)
      .where('id = :id', { id })
      .returning('*')
      .execute();
  }

  async deleteServiceById(id: string) {
    return await this.repository.delete({
      id,
    });
  }
}
