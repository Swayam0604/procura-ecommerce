/* eslint-disable */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsServiceService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // Get all products
  async findAll() {
    return this.productRepository.find();
  }

  // Get single product
  async findOne(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  // Create product
  async create(productData: any) {
    const product = this.productRepository.create(productData);
    return this.productRepository.save(product);
  }

  // Update product
  async update(id: string, productData: any) {
    const result = await this.productRepository.update(id, productData);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.findOne(id);
  }

  // Delete product
  async remove(id: string) {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return { message: 'Product deleted successfully', id };
  }

  getHello(): string {
    return 'Products Service is running!';
  }
}
