/* eslint-disable */
import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthServiceModule);
  app.enableCors(); // Enable CORS for React
  await app.listen(3003);
  console.log('🔐 Auth Service running on http://localhost:3003');
  console.log('📝 Register: http://localhost:3003/register');
  console.log('🔑 Login: http://localhost:3003/login');
}
bootstrap();
