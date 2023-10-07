import { Test, TestingModule } from '@nestjs/testing';
import { SeederController } from './seeder.controller';
import { BarberRepository } from '../barber/repository/barber.repository';
import { EmployeeRepository } from '../employee/repository/employee.repository';
import { SeederService } from './seeder.service';

describe('SeederController', () => {
  let controller: SeederController;
  let service: SeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeederService,
        { provide: EmployeeRepository, useValue: { addEmployee: jest.fn() } },
        { provide: BarberRepository, useValue: { addBarber: jest.fn() } },
      ],
      controllers: [SeederController],
    }).compile();

    controller = module.get<SeederController>(SeederController);
    service = module.get<SeederService>(SeederService);
    module.get<EmployeeRepository>(EmployeeRepository);
    module.get<BarberRepository>(BarberRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
