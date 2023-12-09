import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { Public, Roles } from '../decorator';
import { Role } from '../enum';
import { CreateServiceDto, UpdateServiceDto } from './dto';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Public()
  @Get()
  getAllService() {
    return this.serviceService.getAllService();
  }

  @Public()
  @Post()
  createService(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.createService(createServiceDto);
  }

  @Roles(Role.BARBERMAN, Role.OWNER)
  @Patch(':service')
  updateService(
    @Param('service') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.serviceService.updateService(id, updateServiceDto);
  }

  @Public()
  @Get(':service')
  getService(@Param('service') id: string) {
    return this.serviceService.getservice(id);
  }

  @Roles(Role.BARBERMAN, Role.OWNER)
  @Delete(':service')
  deleteService(@Param('service') id: string) {
    return this.serviceService.deleteService(id);
  }
}
