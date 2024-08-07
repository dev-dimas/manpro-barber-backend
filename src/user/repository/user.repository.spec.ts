import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../../app.module';
import { UserEntity } from '../entities/user.entity';
import { UserTableTestHelper } from '../../../helper/user.table.test.helper';
import { UserRepository } from './user.repository';
import { GenderType } from '../../enum';

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
        password: 'andi123',
        confirmPassword: 'andi123',
        email: 'andi123@gmail.com',
        name: 'andi',
        phone: '081234876945',
      };

      const newUser = await userRepository.addUser(user1);

      const user = await userTableTestHelper.getAllUser();

      expect(user).toHaveLength(1);
      expect(newUser).toMatchObject({
        name: user1.name,
        password: user1.password,
        email: user1.email,
        phone: user1.phone,
      });
    });
  });

  describe('getUserById function', () => {
    it('should find user by id and return correctly', async () => {
      // Arrange
      const user1 = {
        password: 'andi123',
        confirmPassword: 'andi123',
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

  describe('getUserByEmail function', () => {
    it('should find user by email and return correctly', async () => {
      // Arrange
      const user1 = {
        password: 'andi123',
        confirmPassword: 'andi123',
        email: 'andi123@gmail.com',
        name: 'andi',
        phone: '081234876945',
      };

      const newUser = await userTableTestHelper.addUser(user1);

      // Action
      const user = await userRepository.getUserByEmail(newUser.email);

      // Assert
      expect(user).toMatchObject(newUser);
    });
  });

  describe('upadateUser function', () => {
    it('should update user to database and return correctly', async () => {
      // Arrange
      const avatar = 'link file';
      const pathAvatar = 'file location';
      const user1 = {
        password: 'andi123',
        confirmPassword: 'andi123',
        email: 'andi123@gmail.com',
        name: 'andi',
        phone: '081234876945',
      };

      const updateUser1 = {
        email: 'andi12345@gmail.com',
        name: 'andi',
        phone: '081234876945',
        avatar: null,
        gender: GenderType.L,
        birthdayDate: null,
        address: null,
      };

      const newUser = await userTableTestHelper.addUser(user1);

      // Action
      const user = await userRepository.updateUserById(
        newUser.id,
        avatar,
        pathAvatar,
        updateUser1,
      );

      // Assert
      expect(user.raw[0]).toMatchObject({
        password: user1.password,
        email: updateUser1.email,
        name: user1.name,
        phone: user1.phone,
      });
    });
  });

  describe('changePassword function', () => {
    it('should update password to database and return correctly', async () => {
      // Arrange
      const newPassword = 'andi12345';

      const user = {
        password: 'andi123',
        email: 'andi123@gmail.com',
        name: 'andi',
        phone: '081234876945',
      };

      const newUser = await userTableTestHelper.addUser(user);

      // Action
      await userRepository.changePassword(newUser.id, newPassword);

      // Assert
      const users = await userTableTestHelper.getAllUser();
      expect(users[0]).toMatchObject({ ...user, password: newPassword });
    });
  });

  describe('getAllUser function', () => {
    it('should get all user and return correctly', async () => {
      // Arrange
      const user1 = {
        password: 'andi123',
        email: 'andi123@gmail.com',
        name: 'andi',
        phone: '081234876945',
      };

      const user2 = {
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

  describe('deleteUserById function', () => {
    it('should delete data user from database and retrun correctly', async () => {
      // Arrange
      const user1 = {
        password: 'andi123',
        email: 'andi123@gmail.com',
        name: 'andi',
        phone: '081234876945',
      };

      const user2 = {
        password: 'ando123',
        email: 'ando123@gmail.com',
        name: 'ando',
        phone: '91238439219',
      };

      const newUser1 = await userTableTestHelper.addUser(user1);
      await userTableTestHelper.addUser(user2);

      // Action
      const res = await userRepository.deleteUserById(newUser1.id);

      // Assert
      const users = await userTableTestHelper.getAllUser();
      expect(res.affected).toEqual(1);
      expect(users).toHaveLength(1);
      expect(users).toMatchObject([user2]);
    });
  });
});
