import { Test, TestingModule } from '@nestjs/testing';
import { SeederController } from './seeder.controller';
import { EmployeeRepository } from '../employee/repository/employee.repository';
import { SeederService } from './seeder.service';
import { ServiceRepository } from '../service/repository/service.repository';

describe('SeederController', () => {
  let controller: SeederController;
  let service: SeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeederService,
        { provide: EmployeeRepository, useValue: { addEmployee: jest.fn() } },
        { provide: ServiceRepository, useValue: { addService: jest.fn() } },
      ],
      controllers: [SeederController],
    }).compile();

    controller = module.get<SeederController>(SeederController);
    service = module.get<SeederService>(SeederService);
    module.get<EmployeeRepository>(EmployeeRepository);
    module.get<ServiceRepository>(ServiceRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
