import { Controller, Post, Body, ValidationPipe, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/entities/user.entity';
import { GetUser } from './decorator/get-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '로그인 API',
    description: '호출자 로그인 후 토큰을 응답합니다.',
  })
  @Post('/signin')
  signIn(@Body(ValidationPipe) logInDto: LogInDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(logInDto);
  }

  @ApiOperation({
    summary: 'Test',
    description: '테스트용 API',
  })
  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    /*
    @Req() req
    req.user.userId
    */
    console.log('user', user);
  }
}
