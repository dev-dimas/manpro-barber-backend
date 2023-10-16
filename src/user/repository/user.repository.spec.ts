import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../../app.module';
import { UserEntity } from '../entities/user.entity';
import { UserTableTestHelper } from '../helper/user.table.test.helper';
import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let userTableTestHelper: UserTableTestHelper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forFeature([UserEntity])],
      providers: [UserRepository, UserTableTestHelper],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    userTableTestHelper = module.get<UserTableTestHelper>(UserTableTestHelper);
  });

  afterEach(async () => {
    await userTableTestHelper.cleanTable();
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
    expect(userTableTestHelper).toBeDefined();
  });

  describe('addUser function', () => {
    it('should add user to database and return correctly', async () => {
      const user1 = {
        username: 'andi123',
        password: 'andi123',
        email: 'andi123@gmail.com',
        name: 'andi',
        phone: '081234876945',
      };

      const newUser = await userRepository.addUser(user1);

      const user = await userTableTestHelper.getAllUser();

      expect(user).toHaveLength(1);
      expect(newUser).toStrictEqual(user1);
    });
  });

  describe('getUserById function', () => {
    it('should find user by id and return correctly', async () => {
      // Arrange
      const user1 = {
        username: 'andi123',
        password: 'andi123',
        email: 'andi123@gmail.com',
        name: 'andi',
        phone: '081234876945',
      };

      const newUser = await userTableTestHelper.addUser(user1);

      // Action
      const user = await userRepository.getUserById(newUser.id);

      // Assert
      expect(user).toMatchObject(newUser);
    });
  });

  describe('getUserByUsername function', () => {
    it('should find user by username and return correctly', async () => {
      // Arrange
      const user1 = {
        username: 'andi123',
        password: 'andi123',
        email: 'andi123@gmail.com',
        name: 'andi',
        phone: '081234876945',
      };

      const newUser = await userTableTestHelper.addUser(user1);

      // Action
      const user = await userRepository.getUserByUsername(newUser.username);

      // Assert
      expect(user).toMatchObject(newUser);
    });
  });

  describe('upadateUser function', () => {
    it('should update user to database and return correctly', async () => {
      // Arrange
      const user1 = {
        username: 'andi123',
        password: 'andi123',
        email: 'andi123@gmail.com',
        name: 'andi',
        phone: '081234876945',
      };

      const updateUser1 = {
        email: 'andi12345@gmail.com',
      };

      const newUser = await userTableTestHelper.addUser(user1);

      // Action
      const user = await userRepository.updateUserById(newUser.id, updateUser1);

      // Assert
      expect(user.raw[0]).toMatchObject({
        username: user1.username,
        password: user1.password,
        email: updateUser1.email,
        name: user1.name,
        phone: user1.phone,
      });
    });
  });

  describe('getAllUser function', () => {
    it('should get all user and return correctly', async () => {
      // Arrange
      const user1 = {
        username: 'andi123',
        password: 'andi123',
        email: 'andi123@gmail.com',
        name: 'andi',
        phone: '081234876945',
      };

      const user2 = {
        username: 'ando123',
        password: 'ando123',
        email: 'ando123@gmail.com',
        name: 'ando',
        phone: '91238439219',
      };

      const newUser1 = await userTableTestHelper.addUser(user1);
      const newUser2 = await userTableTestHelper.addUser(user2);

      // Action
      const user = await userRepository.getAllUser();

      // Assert
      expect(user).toHaveLength(2);
      expect(user).toMatchObject([{ ...newUser1 }, { ...newUser2 }]);
    });
  });
});
