import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ServiceEntity } from '../entities/service.entity';
import { CreateServiceDto, UpdateServiceDto } from '../dto';

@Injectable()
export class ServiceRepository extends Repository<ServiceEntity> {
  constructor(private dataSource: DataSource) {
    super(ServiceEntity, dataSource.createEntityManager());
  }

  async addService(service: CreateServiceDto) {
    return await this.save(service);
  }

  async getAllService() {
    return await this.find();
  }

  async getServiceById(id: string) {
    return await this.findOneBy({
      id,
    });
  }

  async updateServiceById(id: string, service: UpdateServiceDto) {
    return await this.createQueryBuilder()
      .update(ServiceEntity)
      .set(service)
      .where('id = :id', { id })
      .returning('*')
      .execute();
  }

  async deleteServiceById(id: string) {
    return await this.delete({
      id,
    });
  }
}
