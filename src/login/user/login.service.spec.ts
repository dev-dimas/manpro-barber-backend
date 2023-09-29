import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { Repository } from 'typeorm';

describe('LoginService', () => {
  let service: LoginService;
  let userRepository: Repository<UserEntity>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(() => 'fakeAccessToken'),
          },
        },
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(jwtService).toBeDefined();
  });
});
