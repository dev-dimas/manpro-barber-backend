import { Test, TestingModule } from '@nestjs/testing';
import { BarberService } from './barber.service';
import { BarberRepository } from './repository/barber.repository';

describe('BarberService', () => {
  let service: BarberService;
  let barberRepository: BarberRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BarberService,
        {
          provide: BarberRepository,
          useValue: {
            addBarber: jest.fn(),
            getAllBarber: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BarberService>(BarberService);
    barberRepository = module.get<BarberRepository>(BarberRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(barberRepository).toBeDefined();
  });
});
