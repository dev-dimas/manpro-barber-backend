import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../../app.module';
import { EmployeeEntity } from '../entities/employee.entity';
import { EmployeeTableTestHelper } from '../helper/employee.table.test.helper';
import { EmployeeRepository } from './employee.repository';
import { EmployeeRoleType, GenderType } from '../../enum';

describe('EmployeeRepository', () => {
  let employeeRepository: EmployeeRepository;
  let employeeTableTestHelper: EmployeeTableTestHelper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forFeature([EmployeeEntity])],
      providers: [EmployeeRepository, EmployeeTableTestHelper],
    }).compile();

    employeeRepository = module.get<EmployeeRepository>(EmployeeRepository);
    employeeTableTestHelper = module.get<EmployeeTableTestHelper>(
      EmployeeTableTestHelper,
    );
  });

  afterEach(async () => {
    await employeeTableTestHelper.cleanTable();
  });

  it('should be defined', () => {
    expect(employeeRepository).toBeDefined();
    expect(employeeTableTestHelper).toBeDefined();
  });

  describe('addEmployee', () => {
    it('should add employee to database and retrun correctly', async () => {
      // Arrange
      const employee = {
        name: 'andi',
        email: 'andi@gmail.com',
        noTlp: '18129210231',
        password: 'andi12345',
        gender: GenderType.L,
        role: EmployeeRoleType.ADMIN,
      };

      // Action
      const newEmployee = await employeeRepository.addEmployee(employee);

      // Assert
      const allEmployee = await employeeTableTestHelper.getAllEmployee();
      expect(allEmployee).toHaveLength(1);
      expect(newEmployee).toStrictEqual(employee);
    });
  });

  describe('getAllEmployee', () => {
    it('sould get all data employee from database and retrun correctly', async () => {
      // Arange
      const employee1 = {
        name: 'andi',
        email: 'andi@gmail.com',
        noTlp: '18129210231',
        password: 'andi12345',
        gender: GenderType.L,
        role: EmployeeRoleType.ADMIN,
      };

      const employee2 = {
        name: 'ando',
        email: 'ando@gmail.com',
        noTlp: '28291212922',
        password: 'ando12345',
        gender: GenderType.L,
        role: EmployeeRoleType.ADMIN,
      };

      await employeeTableTestHelper.addEmployee(employee1);
      await employeeTableTestHelper.addEmployee(employee2);

      // Action
      const allEmployee = await employeeRepository.getAllEmployee();

      // Assert
      expect(allEmployee).toHaveLength(2);
      expect(allEmployee).toMatchObject([{ ...employee1 }, { ...employee2 }]);
    });
  });

  describe('getEmployeeById', () => {
    it('should get data employee from database by id and return correctly', async () => {
      // Arrange
      const employee1 = {
        name: 'andi',
        email: 'andi@gmail.com',
        noTlp: '18129210231',
        password: 'andi12345',
        gender: GenderType.L,
        role: EmployeeRoleType.ADMIN,
      };

      const employee2 = {
        name: 'ando',
        email: 'ando@gmail.com',
        noTlp: '28291212922',
        password: 'ando12345',
        gender: GenderType.L,
        role: EmployeeRoleType.ADMIN,
      };

      await employeeTableTestHelper.addEmployee(employee1);
      await employeeTableTestHelper.addEmployee(employee2);

      const employee = await employeeTableTestHelper.getAllEmployee();

      // Action
      const res = await employeeRepository.getEmployeeById(employee[0].id);

      // Assert
      expect(res).toMatchObject(employee1);
    });
  });

  describe('getEmployeeByEmail', () => {
    it('should get data employee from database by email and return correctly', async () => {
      // Arrange
      const employee1 = {
        name: 'andi',
        email: 'andi@gmail.com',
        noTlp: '18129210231',
        password: 'andi12345',
        gender: GenderType.L,
        role: EmployeeRoleType.ADMIN,
      };

      const employee2 = {
        name: 'ando',
        email: 'ando@gmail.com',
        noTlp: '28291212922',
        password: 'ando12345',
        gender: GenderType.L,
        role: EmployeeRoleType.ADMIN,
      };

      await employeeTableTestHelper.addEmployee(employee1);
      await employeeTableTestHelper.addEmployee(employee2);

      // Action
      const res = await employeeRepository.getEmployeeByEmail(employee1.email);

      // Assert
      expect(res).toMatchObject(employee1);
    });
  });

  describe('updateEmployeeById', () => {
    it('update data employee to database and return correctly', async () => {
      // Arrange
      const employee = {
        name: 'andi',
        email: 'andi@gmail.com',
        noTlp: '18129210231',
        password: 'andi12345',
        gender: GenderType.L,
        role: EmployeeRoleType.ADMIN,
      };

      const updateEmployee = {
        name: 'andi',
        email: 'andi@gmail.com',
        noTlp: '18129210231',
        password: 'andi12345',
        gender: GenderType.L,
        role: EmployeeRoleType.ADMIN,
        isIncharge: false,
      };

      const newEmployee = await employeeTableTestHelper.addEmployee(employee);

      // Action
      const res = await employeeRepository.updateEmployeeById(
        newEmployee.id,
        updateEmployee,
      );

      // Assert
      expect(res.raw[0]).toMatchObject(updateEmployee);
    });
  });

  describe('deleteEmployeeById', () => {
    it('should delete employee in database by id', async () => {
      // Arrange
      const employee1 = {
        name: 'andi',
        email: 'andi@gmail.com',
        noTlp: '18129210231',
        password: 'andi12345',
        gender: GenderType.L,
        role: EmployeeRoleType.ADMIN,
      };

      const employee2 = {
        name: 'ando',
        email: 'ando@gmail.com',
        noTlp: '28291212922',
        password: 'ando12345',
        gender: GenderType.L,
        role: EmployeeRoleType.ADMIN,
      };

      await employeeTableTestHelper.addEmployee(employee1);
      await employeeTableTestHelper.addEmployee(employee2);

      let employee = await employeeTableTestHelper.getAllEmployee();

      // Action
      const res = await employeeRepository.deleteEmployeeById(employee[0].id);

      // Assert
      employee = await employeeTableTestHelper.getAllEmployee();
      expect(employee).toHaveLength(1);
      expect(employee).toMatchObject([employee2]);
      expect(res.affected).toEqual(1);
    });
  });

  describe('countEmployeeInCharge', () => {
    it('should count employee incharge and return correctly', async () => {
      // Arrange
      const employee1 = {
        name: 'andi',
        email: 'andi@gmail.com',
        noTlp: '18129210231',
        password: 'andi12345',
        gender: GenderType.L,
        role: EmployeeRoleType.ADMIN,
        isIncharge: true,
      };

      const employee2 = {
        name: 'ando',
        email: 'ando@gmail.com',
        noTlp: '28291212922',
        password: 'ando12345',
        gender: GenderType.L,
        role: EmployeeRoleType.ADMIN,
        isIncharge: true,
      };

      const employee3 = {
        name: 'andu',
        email: 'andu@gmail.com',
        noTlp: '00029210231',
        password: 'andi12345',
        gender: GenderType.L,
        role: EmployeeRoleType.ADMIN,
        isIncharge: false,
      };

      const employee4 = {
        name: 'doni',
        email: 'doni@gmail.com',
        noTlp: '11129210231',
        password: 'doni12345',
        gender: GenderType.L,
        role: EmployeeRoleType.OWNER,
      };

      await employeeTableTestHelper.addEmployee(employee1);
      await employeeTableTestHelper.addEmployee(employee2);
      await employeeTableTestHelper.addEmployee(employee3);
      await employeeTableTestHelper.addEmployee(employee4);

      // Action
      const res = await employeeRepository.countEmployeeInCharge();

      // Assert
      expect(res).toEqual(2);
    });
  });
});
