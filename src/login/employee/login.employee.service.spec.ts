import { Test, TestingModule } from '@nestjs/testing';
import { LoginEmployeeService } from './login.employee.service';
import { EmployeeRepository } from '../../employee/repository/employee.repository';
import { JwtService } from '@nestjs/jwt';

describe('EmployeeService', () => {
  let loginEmployeeService: LoginEmployeeService;
  let employeeRepository: EmployeeRepository;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginEmployeeService,
        JwtService,
        {
          provide: EmployeeRepository,
          useValue: {
            getEmployeeByEmail: jest.fn(),
            addEmployee: jest.fn(),
          },
        },
      ],
    }).compile();

    loginEmployeeService =
      module.get<LoginEmployeeService>(LoginEmployeeService);
    employeeRepository = module.get<EmployeeRepository>(EmployeeRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(loginEmployeeService).toBeDefined();
    expect(employeeRepository).toBeDefined();
    expect(jwtService).toBeDefined();
  });
});
