import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../user/repository/user.repository';

describe('LoginService', () => {
  let service: LoginService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        JwtService,
        {
          provide: UserRepository,
          useValue: {
            getUserByUsername: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
    jwtService = module.get<JwtService>(JwtService);
    module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(jwtService).toBeDefined();
  });
});
