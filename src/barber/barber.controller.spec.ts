import { Test, TestingModule } from '@nestjs/testing';
import { BarberController } from './barber.controller';
import { BarberService } from './barber.service';
import { BarberRepository } from './repository/barber.repository';

describe('BarberController', () => {
  let controller: BarberController;
  let service: BarberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BarberController],
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

    controller = module.get<BarberController>(BarberController);
    service = module.get<BarberService>(BarberService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
