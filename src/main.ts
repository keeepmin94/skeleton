import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true, // 부트스트래핑 과정까지 nest-winston 로거 사용
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('server.port');

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(port);
}
bootstrap();
