import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/modules/user/user.service';
import { User } from 'src/entities/user.entity';
import { RegisterUser } from 'src/modules/user/dto/registerUser.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { LoggerModule } from 'src/common/logger.module';
import { LoggerService } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  const mockRepository = {
    save: jest.fn(),
  };
  const registerDto: RegisterUser = {
    userName: 'dollarguard',
    password: 'dollarguard!',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [UserService, { provide: getRepositoryToken(User), useValue: mockRepository }],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('register User', async () => {
    const userSaveSpy = jest.spyOn(mockRepository, 'save').mockResolvedValue(null);

    const result = await service.signUp(registerDto);

    expect(result).toEqual({ message: '회원가입에 성공했습니다' });
    expect(userSaveSpy).toBeCalledTimes(1);
  });

  it('register User Error', async () => {
    jest.spyOn(mockRepository, 'save').mockRejectedValue(new Error());

    try {
      await service.signUp(registerDto);
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
    }
  });
});
