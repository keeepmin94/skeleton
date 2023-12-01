import { registerAs } from '@nestjs/config';

export default registerAs('server', () => ({
  port: Number(process.env.SERVER_PORT),
  name: String(process.env.PROJECT_NAME),
}));
