import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceRepository } from './repository/service.repository';
import { CreateServiceDto, UpdateServiceDto } from './dto';
import { EmployeeRepository } from '../employee/repository/employee.repository';

@Injectable()
export class ServiceService {
  constructor(
    private readonly serviceRepository: ServiceRepository,
    private readonly employeeRepository: EmployeeRepository,
  ) {}

  async getAllService() {
    const service = await this.serviceRepository.getAllService();
    return { statusCode: HttpStatus.OK, data: service };
  }

  async createService(createServiceDto: CreateServiceDto, user: any) {
    const employee = await this.employeeRepository.getEmployeeById(user.sub);
    if (!employee)
      throw new HttpException(`Employee not found`, HttpStatus.NOT_FOUND);
    const service = await this.serviceRepository.addService(
      createServiceDto,
      // user.sub,
    );
    return { statusCode: HttpStatus.CREATED, data: service };
  }

  async updateService(
    id: string,
    updateServiceDto: UpdateServiceDto,
    user: any,
  ) {
    const employee = user.sub;
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
