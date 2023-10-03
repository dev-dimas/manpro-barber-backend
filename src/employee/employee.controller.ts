import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  getAllEmployee() {
    return this.employeeService.getAllEmployee();
  }

  @Post()
  createEmpolyee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.createEmployee(createEmployeeDto);
  }

  @Patch(':employee')
  updateEmployee(
    @Param('employee') id: string,
    @Body() updateEmployee: UpdateEmployeeDto,
  ) {
    return this.employeeService.updateEmployee(+id, updateEmployee);
  }

  @Get(':employee')
  getEmployee(@Param('employee') id: string) {
    return this.employeeService.getEmployee(+id);
  }

  @Delete(':employee')
  deleteEmployee(@Param('employee') id: string) {
    return this.employeeService.deleteEmployee(+id);
  }
}
