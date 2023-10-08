import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceRepository } from './repository/service.repository';
import { CreateServiceDto, UpdateServiceDto } from './dto';
import { EmployeeRepository } from '../employee/repository/employee.repository';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceRepository)
    private readonly serviceRepository: ServiceRepository,
    @InjectRepository(EmployeeRepository)
    private readonly employeeRepository: EmployeeRepository,
  ) {}

  async getAllService() {
    const service = await this.serviceRepository.getAllService();
    return { statusCode: HttpStatus.OK, data: service };
  }

  async createService(createServiceDto: CreateServiceDto, user: any) {
    const employee = await this.employeeRepository.getEmployeeById(user.sub);
    createServiceDto.barber = employee[0].barberId;
    createServiceDto.employee = user.sub;
    const service = await this.serviceRepository.addService(createServiceDto);
    return { statusCode: HttpStatus.CREATED, data: service };
  }

  async updateService(
    id: string,
    updateServiceDto: UpdateServiceDto,
    user: any,
  ) {
    updateServiceDto.employee = user.sub;
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
