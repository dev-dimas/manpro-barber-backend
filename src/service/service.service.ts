import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceRepository } from './repository/service.repository';
import { CreateServiceDto, UpdateServiceDto } from './dto';

@Injectable()
export class ServiceService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async getAllService() {
    const service = await this.serviceRepository.getAllService();
    return { statusCode: HttpStatus.OK, data: service };
  }

  async createService(createServiceDto: CreateServiceDto) {
    const service = await this.serviceRepository.addService(createServiceDto);
    return { statusCode: HttpStatus.CREATED, data: service };
  }

  async updateService(id: string, updateServiceDto: UpdateServiceDto) {
    const service = await this.serviceRepository.updateServiceById(
      id,
      updateServiceDto,
    );

    if (service.affected == 0)
      throw new HttpException(`Id service not found`, HttpStatus.NOT_FOUND);

    return { statusCode: HttpStatus.CREATED, data: service };
  }

  async getservice(id: string) {
    const service = await this.serviceRepository.getServiceById(id);

    if (!service)
      throw new HttpException(`Id service not found`, HttpStatus.NOT_FOUND);

    return { statusCode: HttpStatus.OK, data: service };
  }

  async deleteService(id: string) {
    const service = await this.serviceRepository.deleteServiceById(id);

    if (service.affected == 0)
      throw new HttpException(`Id service not found`, HttpStatus.NOT_FOUND);

    return { statusCode: HttpStatus.OK, data: service.raw[0] };
  }
}
