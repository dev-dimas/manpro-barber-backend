import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';
import { Public, Roles } from '../decorator';
import { Role } from '../enum';

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

  @Roles(Role.BARBERMAN, Role.OWNER)
  @Patch(':employee')
  updateEmployee(
    @Param(
      'employee',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
    @Body() updateEmployee: UpdateEmployeeDto,
  ) {
    return this.employeeService.updateEmployee(id, updateEmployee);
  }

  @Public()
  @Get(':employee')
  getEmployee(
    @Param(
      'employee',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.employeeService.getEmployee(id);
  }

  @Roles(Role.BARBERMAN, Role.OWNER)
  @Delete(':employee')
  deleteEmployee(
    @Param(
      'employee',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.employeeService.deleteEmployee(id);
  }
}
