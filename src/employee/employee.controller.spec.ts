import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeRepository } from './repository/employee.repository';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        JwtService,
        Reflector,
        EmployeeService,
        {
          provide: EmployeeRepository,
          useValue: {
            getEmployeeByEmail: jest.fn(),
            addEmployee: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
