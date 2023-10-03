import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { EmployeeRepository } from './repository/employee.repository';

describe('EmployeeService', () => {
  let employeeService: EmployeeService;
  let employeeRepository: EmployeeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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

    employeeService = module.get<EmployeeService>(EmployeeService);
    employeeRepository = module.get<EmployeeRepository>(EmployeeRepository);
  });

  it('should be defined', () => {
    expect(employeeService).toBeDefined();
    expect(employeeRepository).toBeDefined();
  });
});
