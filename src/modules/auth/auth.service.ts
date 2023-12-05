import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { LogInDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(logIntDto: LogInDto): Promise<{ accessToken: string }> {
    const { userName, password } = logIntDto;
    const user = await this.userRepository.findOne({ where: { userName } });

    if (!user) throw new UnprocessableEntityException('해당 유저가 없습니다.');

    const isAuth = await bcrypt.compare(password, user.password);

    if (!isAuth) throw new UnauthorizedException('비밀번호가 틀렸습니다.');

    const payload = { userId: user.id, userName: user.userName };
    const accessToken = await this.getJwtAccessToken(payload);

    return { accessToken };
  }

  // access token 생성
  async getJwtAccessToken(payload: object): Promise<string> {
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('server.jwt_secret'),
      expiresIn: this.configService.get('server.jwt_expire'),
    });

    return token;
  }
}
