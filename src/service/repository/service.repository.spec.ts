import { Test, TestingModule } from '@nestjs/testing';
import { ServiceTableTestHelper } from '../helper/service.table.helper';
import { ServiceRepository } from './service.repository';
import { AppModule } from '../../app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from '../entities/service.entity';

describe('ServiceRepository', () => {
  let serviceRepository: ServiceRepository;
  let serviceTableTestHelper: ServiceTableTestHelper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forFeature([ServiceEntity])],
      providers: [ServiceRepository, ServiceTableTestHelper],
    }).compile();

    serviceRepository = module.get<ServiceRepository>(ServiceRepository);
    serviceTableTestHelper = module.get<ServiceTableTestHelper>(
      ServiceTableTestHelper,
    );
  });

  afterEach(async () => {
    await serviceTableTestHelper.cleanTable();
  });

  it('should be define', () => {
    expect(serviceRepository).toBeDefined();
    expect(serviceTableTestHelper).toBeDefined();
  });

  describe('function addService', () => {
    it('should add data to database and retrun correctly', async () => {
      // Arrange
      const service = {
        name: 'potong',
        price: 20000,
        duration: '00:40',
      };

      // Action
      await serviceRepository.addService(service, '123');
    });
  });
});
