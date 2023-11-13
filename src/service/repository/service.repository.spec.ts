import { Test, TestingModule } from '@nestjs/testing';
import { ServiceTableTestHelper } from '../../../helper/service.table.helper';
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
        duration: '00:40:00',
      };

      // Action
      const newServices = await serviceRepository.addService(service);

      // Assert
      const services = await serviceTableTestHelper.getAllService();
      expect(services).toHaveLength(1);
      expect(newServices).toMatchObject(service);
    });
  });

  describe('function getAllService', () => {
    it('it should get all service from database and return correctly', async () => {
      // Arrange
      const service1 = {
        name: 'potong',
        price: 20000,
        duration: '00:40:00',
      };

      const service2 = {
        name: 'potong2',
        price: 20000,
        duration: '00:40:00',
      };

      const service3 = {
        name: 'potong3',
        price: 20000,
        duration: '00:40:00',
      };

      await serviceTableTestHelper.addService(service1);
      await serviceTableTestHelper.addService(service2);
      await serviceTableTestHelper.addService(service3);

      // Action
      const services = await serviceRepository.getAllService();

      // Assert
      expect(services).toHaveLength(3);
      expect(services).toMatchObject([
        { ...service1 },
        { ...service2 },
        { ...service3 },
      ]);
    });
  });

  describe('function getServiceById', () => {
    it('should get service by id from database and return correctly', async () => {
      // Arrange
      const service1 = {
        name: 'potong',
        price: 20000,
        duration: '00:40:00',
      };

      const service2 = {
        name: 'potong2',
        price: 20000,
        duration: '00:40:00',
      };

      await serviceTableTestHelper.addService(service1);
      await serviceTableTestHelper.addService(service2);

      const services = await serviceTableTestHelper.getAllService();

      // Action
      const res = await serviceRepository.getServiceById(services[0].id);

      // Assert
      console.log(res);
      expect(res).toMatchObject(service1);
    });
  });

  describe('function updateServiceById', () => {
    it('should update service by id in database and return correctly', async () => {
      // Arrange
      const service1 = {
        name: 'potong',
        price: 20000,
        duration: '00:40:00',
      };

      const service2 = {
        name: 'potong2',
        price: 20000,
        duration: '00:40:00',
      };

      const updateService = {
        name: 'potong rambut',
        price: 15000,
        duration: '00:40:00',
      };

      await serviceTableTestHelper.addService(service1);
      await serviceTableTestHelper.addService(service2);

      let services = await serviceTableTestHelper.getAllService();

      // Action
      const res = await serviceRepository.updateServiceById(
        services[0].id,
        updateService,
      );

      // Assert
      services = await serviceTableTestHelper.getAllService();
      expect(res.raw[0]).toMatchObject(updateService);
    });
  });

  describe('function deleteServiceById', () => {
    it('should delete service by id in database', async () => {
      // Arrange
      const service1 = {
        name: 'potong',
        price: 20000,
        duration: '00:40:00',
      };

      const service2 = {
        name: 'potong2',
        price: 20000,
        duration: '00:40:00',
      };

      const service3 = {
        name: 'potong3',
        price: 20000,
        duration: '00:40:00',
      };

      await serviceTableTestHelper.addService(service1);
      await serviceTableTestHelper.addService(service2);
      await serviceTableTestHelper.addService(service3);

      let services = await serviceTableTestHelper.getAllService();

      // Action
      const res = await serviceRepository.deleteServiceById(services[1].id);

      // Assert
      services = await serviceTableTestHelper.getAllService();
      expect(res.affected).toEqual(1);
      expect(services).toHaveLength(2);
      expect(services).toMatchObject([{ ...service1 }, { ...service3 }]);
    });
  });
});
