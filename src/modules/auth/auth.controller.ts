import { Controller, Post, Body, ValidationPipe, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/entities/user.entity';
import { GetUser } from './decorator/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  signIn(@Body(ValidationPipe) logInDto: LogInDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(logInDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    /*
    @Req() req
    req.user.userId
    */
    console.log('user', user);
  }
}
