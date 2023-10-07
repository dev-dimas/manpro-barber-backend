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
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';
import { Public, Roles } from '../decorator';
import { Role } from '../enum';
import { Request } from 'express';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Public()
  @Get()
  getAllEmployee() {
    return this.employeeService.getAllEmployee();
  }

  @Roles(Role.ADMIN, Role.OWNER)
  @Post()
  createEmpolyee(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @Req() req: Request,
  ) {
    return this.employeeService.createEmployee(createEmployeeDto, req.user);
  }

  @Roles(Role.ADMIN, Role.OWNER)
  @Patch(':employee')
  updateEmployee(
    @Param('employee') id: string,
    @Body() updateEmployee: UpdateEmployeeDto,
  ) {
    return this.employeeService.updateEmployee(id, updateEmployee);
  }

  @Public()
  @Get(':employee')
  getEmployee(@Param('employee') id: string) {
    return this.employeeService.getEmployee(id);
  }

  @Roles(Role.OWNER)
  @Delete(':employee')
  deleteEmployee(@Param('employee') id: string) {
    return this.employeeService.deleteEmployee(id);
  }
}
