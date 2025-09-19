/* eslint-disable */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Headers
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller()
export class ApiGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  getHello() {
    return {
      message: 'API Gateway is running!',
      services: {
        products: 'http://localhost:3000/products',
        orders: 'http://localhost:3000/orders',
      },
    };
  }

  // Products Routes
  @Get('products')
  async getAllProducts() {
    try {
      const response = await firstValueFrom(
        this.httpService.get('http://localhost:3001/products'),
      );
      return response.data;
    } catch (error) {
      return { error: 'Products Service unavailable' };
    }
  }

  @Post('products')
  async createProduct(@Body() productData: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://localhost:3001/products', productData),
      );
      return response.data;
    } catch (error) {
      return { error: 'Products Service unavailable' };
    }
  }

  @Get('products/:id')
  async getProduct(@Param('id') id: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`http://localhost:3001/products/${id}`),
      );
      return response.data;
    } catch (error) {
      return { error: 'Products Service unavailable' };
    }
  }

  @Put('products/:id')
  async updateProduct(@Param('id') id: string, @Body() productData: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.put(
          `http://localhost:3001/products/${id}`,
          productData,
        ),
      );
      return response.data;
    } catch (error) {
      return { error: 'Products Service unavailable' };
    }
  }

  @Delete('products/:id')
  async deleteProduct(@Param('id') id: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(`http://localhost:3001/products/${id}`),
      );
      return response.data;
    } catch (error) {
      return { error: 'Products Service unavailable' };
    }
  }

  // Orders Routes
  @Get('orders')
  async getAllOrders() {
    try {
      const response = await firstValueFrom(
        this.httpService.get('http://localhost:3002/orders'),
      );
      return response.data;
    } catch (error) {
      return { error: 'Orders Service unavailable' };
    }
  }

  @Post('orders')
  async createOrder(@Body() orderData: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://localhost:3002/orders', orderData),
      );
      return response.data;
    } catch (error) {
      return { error: 'Orders Service unavailable' };
    }
  }

  @Get('orders/:id')
  async getOrder(@Param('id') id: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`http://localhost:3002/orders/${id}`),
      );
      return response.data;
    } catch (error) {
      return { error: 'Orders Service unavailable' };
    }
  }

  @Put('orders/:id')
  async updateOrder(@Param('id') id: string, @Body() orderData: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.put(`http://localhost:3002/orders/${id}`, orderData),
      );
      return response.data;
    } catch (error) {
      return { error: 'Orders Service unavailable' };
    }
  }

  @Delete('orders/:id')
  async deleteOrder(@Param('id') id: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(`http://localhost:3002/orders/${id}`),
      );
      return response.data;
    } catch (error) {
      return { error: 'Orders Service unavailable' };
    }
  }

  @Post('auth/register')
  async register(@Body() userData: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://localhost:3003/register', userData),
      );
      return response.data;
    } catch (error) {
      return { error: 'Auth Service unavailable' };
    }
  }

  @Post('auth/login')
  async login(@Body() credentials: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://localhost:3003/login', credentials),
      );
      return response.data;
    } catch (error) {
      return { error: 'Auth Service unavailable' };
    }
  }

  @Get('auth/profile')
  async getProfile(@Headers('authorization') authorization: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get('http://localhost:3003/profile', {
          headers: { Authorization: authorization },
        }),
      );
      return response.data;
    } catch (error) {
      return { error: 'Auth Service unavailable' };
    }
  }
}
