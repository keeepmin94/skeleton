import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUser } from './dto/registerUser.dto';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '회원가입 API',
    description: '유저를 등록합니다.',
  })
  @Post('/signup')
  signUp(@Body(ValidationPipe) registerUser: RegisterUser): Promise<object> {
    return this.userService.signUp(registerUser);
  }
}
