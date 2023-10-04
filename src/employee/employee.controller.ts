import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';
import { Request } from 'express';
import { Roles } from '../decorator/role.decorator';
import { Role } from '../enum';
import { RolesGuard } from '../guard/jwt.guard';
import { Public } from '../decorator/public.decorator';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Public()
  @Get()
  getAllEmployee() {
    return this.employeeService.getAllEmployee();
  }

  @Public()
  @Post()
  createEmpolyee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.createEmployee(createEmployeeDto);
  }

  @Public()
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

  @UseGuards(RolesGuard)
  @Roles(Role.OWNER)
  @Delete(':employee')
  deleteEmployee(@Param('employee') id: string, @Req() req: Request) {
    // console.log(req);
    // return this.employeeService.deleteEmployee(id);
  }
}
