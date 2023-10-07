import { Test, TestingModule } from '@nestjs/testing';
import { SeederService } from './seeder.service';
import { BarberRepository } from '../barber/repository/barber.repository';
import { EmployeeRepository } from '../employee/repository/employee.repository';

describe('SeederService', () => {
  let service: SeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeederService,
        { provide: EmployeeRepository, useValue: { addEmployee: jest.fn() } },
        { provide: BarberRepository, useValue: { addBarber: jest.fn() } },
      ],
    }).compile();

    service = module.get<SeederService>(SeederService);
    module.get<EmployeeRepository>(EmployeeRepository);
    module.get<BarberRepository>(BarberRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
