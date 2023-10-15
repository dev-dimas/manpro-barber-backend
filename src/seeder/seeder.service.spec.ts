import { Test, TestingModule } from '@nestjs/testing';
import { SeederService } from './seeder.service';
import { EmployeeRepository } from '../employee/repository/employee.repository';

describe('SeederService', () => {
  let service: SeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeederService,
        { provide: EmployeeRepository, useValue: { addEmployee: jest.fn() } },
      ],
    }).compile();

    service = module.get<SeederService>(SeederService);
    module.get<EmployeeRepository>(EmployeeRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
