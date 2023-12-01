import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LogInDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userName: string;

  @IsString()
  @MinLength(8, { message: '최소 8자리 이상 작성해야 합니다.' })
  @MaxLength(20, { message: '20자리 이하로 작성해야 합니다.' })
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/, {
    message: '숫자, 영어, 특수문자를 사용하여 작성해야합니다.',
  })
  password: string;
}
