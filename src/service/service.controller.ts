import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { Public, Roles } from '../decorator';
import { Role } from '../enum';
import { CreateServiceDto, UpdateServiceDto } from './dto';
import { Request } from 'express';

@Controller('service')
export class ServiceController {
//   constructor(private readonly serviceService: ServiceService) {}

//   @Public()
//   @Get()
//   getAllService() {
//     return this.serviceService.getAllService();
//   }

//   @Roles(Role.ADMIN, Role.OWNER)
//   @Post()
//   createService(
//     @Body() createServiceDto: CreateServiceDto,
//     @Req() req: Request,
//   ) {
//     return this.serviceService.createService(createServiceDto, req.user);
//   }

//   @Roles(Role.ADMIN, Role.OWNER)
//   @Patch(':service')
//   updateService(
//     @Param('service') id: string,
//     @Body() updateServiceDto: UpdateServiceDto,
//   ) {
//     return this.serviceService.updateService(id, updateServiceDto);
//   }

//   @Public()
//   @Get(':service')
//   getService(@Param('service') id: string) {
//     return this.serviceService.getservice(id);
//   }

//   @Roles(Role.OWNER)
//   @Delete(':service')
//   deleteService(@Param('service') id: string) {
//     return this.serviceService.deleteService(id);
//   }
}
