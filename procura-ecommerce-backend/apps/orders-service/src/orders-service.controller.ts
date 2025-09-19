/* eslint-disable */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { OrdersServiceService } from './orders-service.service';

@Controller()
export class OrdersServiceController {
  constructor(private readonly ordersServiceService: OrdersServiceService) {}

  @Get()
  getHello(): string {
    return 'Orders Service is running!';
  }

  @Get('orders')
  async getAllOrders() {
    return this.ordersServiceService.findAll();
  }

  @Post('orders')
  async createOrder(@Body() orderData: any) {
    return this.ordersServiceService.create(orderData);
  }

  @Get('orders/:id')
  async getOrder(@Param('id') id: string) {
    return this.ordersServiceService.findOne(id);
  }

  @Put('orders/:id')
  async updateOrder(@Param('id') id: string, @Body() orderData: any) {
    return this.ordersServiceService.update(id, orderData);
  }

  @Delete('orders/:id')
  async deleteOrder(@Param('id') id: string) {
    return this.ordersServiceService.remove(id);
  }
}
