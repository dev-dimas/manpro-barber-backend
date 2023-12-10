import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from './password.service';
import { UserRepository } from '../user/repository/user.repository';

describe('PasswordService', () => {
  let service: PasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PasswordService,
        {
          provide: UserRepository,
          useValue: { addUser: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<PasswordService>(PasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
