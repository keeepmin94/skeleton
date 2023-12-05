import { registerAs } from '@nestjs/config';

export default registerAs('server', () => ({
  port: Number(process.env.SERVER_PORT),
  name: String(process.env.PROJECT_NAME),
  jwt_secret: String(process.env.JWT_ACCESS_TOKEN_SECRET),
  jwt_expire: String(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
}));
