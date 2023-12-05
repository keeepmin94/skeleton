import { ConflictException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUser } from './dto/registerUser.dto';
import * as bcrypt from 'bcryptjs';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerService } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
  ) {}

  async signUp(registerUser: RegisterUser): Promise<object> {
    const { userName, password } = registerUser;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
      userName,
      password: hashedPassword,
    };

    try {
      await this.userRepository.save(user);

      return { message: '회원가입에 성공했습니다' };
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error.code === '23505') {
        throw new ConflictException('존재하는 유저 이름입니다.');
      }
      throw new InternalServerErrorException('회원가입에 실패 했습니다.');
    }
  }
}
