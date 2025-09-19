/* eslint-disable */
import { NestFactory } from '@nestjs/core';
import { OrdersServiceModule } from './orders-service.module';

async function bootstrap() {
  const app = await NestFactory.create(OrdersServiceModule);
  await app.listen(3002); // Different port from products service
  console.log('📦 Orders Service running on http://localhost:3002');
  console.log('🧪 Test with Postman!');
}
bootstrap();
