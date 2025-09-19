/* eslint-disable */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersServiceService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  // Get all orders
  async findAll() {
    return this.orderRepository.find();
  }

  // Get single order
  async findOne(id: string) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  // Create order
  async create(orderData: any) {
    const order = this.orderRepository.create(orderData);
    return this.orderRepository.save(order);
  }

  // Update order
  async update(id: string, orderData: any) {
    const result = await this.orderRepository.update(id, orderData);
    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return this.findOne(id);
  }

  // Delete order
  async remove(id: string) {
    const result = await this.orderRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return { message: 'Order deleted successfully', id };
  }

  getHello(): string {
    return 'Orders Service is running!';
  }
}
