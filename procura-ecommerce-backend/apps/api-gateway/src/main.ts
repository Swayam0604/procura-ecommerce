/* eslint-disable */
import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  // Enable CORS for React frontend
  app.enableCors({
    origin: 'http://localhost:3003', // Fixed to correct React port
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
  console.log('🚀 API Gateway running on http://localhost:3000');
  console.log('🎨 React Frontend: http://localhost:3003');
}
bootstrap();
