import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from '../entities/service.entity';

@Injectable()
export class ServiceTableTestHelper {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly repository: Repository<ServiceEntity>,
  ) {}

  async addService({ name = 'potong', price = 20000, duration = '00:40' }) {
    return await this.repository.save({ name, price, duration });
  }

  async getAllService() {
    return await this.repository.find();
  }

  async findServiceById(id: string) {
    return await this.repository.findOneBy({
      id,
    });
  }

  async deleteServiceById(id: string) {
    return await this.repository.delete({
      id,
    });
  }

  async cleanTable() {
    return await this.repository.query('DELETE FROM service WHERE 1=1');
  }
}
