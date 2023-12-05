import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import serverConfig from './config/server.config';
import { validationSchema } from './config/validationSchema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { LoggerModule } from './common/logger.module';
import { ExceptionModule } from './common/exception.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [serverConfig],
      isGlobal: true,
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      validationSchema,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
    }),
    LoggerModule,
    ExceptionModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
