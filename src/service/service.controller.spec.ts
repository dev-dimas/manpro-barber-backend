import { Test, TestingModule } from '@nestjs/testing';
import { ServiceController } from './service.controller';
import { EmployeeRepository } from '../employee/repository/employee.repository';
import { ServiceRepository } from './repository/service.repository';
import { ServiceService } from './service.service';

describe('ServiceController', () => {
  let controller: ServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceController],
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

    controller = module.get<ServiceController>(ServiceController);
    module.get<ServiceService>(ServiceService);
    module.get<ServiceRepository>(ServiceRepository);
    module.get<EmployeeRepository>(EmployeeRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
