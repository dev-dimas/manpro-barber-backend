import { Test, TestingModule } from '@nestjs/testing';
import { ServiceService } from './service.service';
import { ServiceRepository } from './repository/service.repository';
import { EmployeeRepository } from '../employee/repository/employee.repository';

describe('ServiceService', () => {
  let service: ServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceService,
        {
          provide: ServiceRepository,
          useValue: {
            addService: jest.fn(),
          },
        },
        {
          provide: EmployeeRepository,
          useValue: {
            getEmployeeById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ServiceService>(ServiceService);
    module.get<ServiceRepository>(ServiceRepository);
    module.get<EmployeeRepository>(EmployeeRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
