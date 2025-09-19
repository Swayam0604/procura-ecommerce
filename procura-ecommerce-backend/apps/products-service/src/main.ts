/* eslint-disable */
import { NestFactory } from '@nestjs/core';
import { ProductsServiceModule } from './products-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductsServiceModule);
  await app.listen(3001);
  console.log('🛍️ Products Service running on http://localhost:3001');
  console.log('🧪 Test with Postman!');
}
bootstrap();
