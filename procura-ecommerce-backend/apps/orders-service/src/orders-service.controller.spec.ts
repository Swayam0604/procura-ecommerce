/* eslint-disable */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { OrdersServiceService } from './orders-service.service';

@Controller()
export class OrdersServiceController {
  constructor(private readonly ordersServiceService: OrdersServiceService) {}

  @Get()
  getHello(): string {
    return this.ordersServiceService.getHello();
  }

  @Get('orders')
  async getAllOrders() {
    return this.ordersServiceService.findAll();
  }

  @Get('orders/:id')
  async getOrder(@Param('id') id: string) {
    return this.ordersServiceService.findOne(id);
  }

  @Post('orders')
  async createOrder(@Body() orderData: any) {
    return this.ordersServiceService.create(orderData);
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
