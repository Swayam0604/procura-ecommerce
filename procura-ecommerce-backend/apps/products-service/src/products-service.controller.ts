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
import { ProductsServiceService } from './products-service.service';

@Controller()
export class ProductsServiceController {
  constructor(
    private readonly productsServiceService: ProductsServiceService,
  ) {}

  @Get()
  getHello(): string {
    return this.productsServiceService.getHello();
  }

  @Get('products')
  async getAllProducts() {
    return this.productsServiceService.findAll();
  }

  @Get('products/:id')
  async getProduct(@Param('id') id: string) {
    return this.productsServiceService.findOne(id);
  }

  @Post('products')
  async createProduct(@Body() productData: any) {
    return this.productsServiceService.create(productData);
  }

  @Put('products/:id')
  async updateProduct(@Param('id') id: string, @Body() productData: any) {
    return this.productsServiceService.update(id, productData);
  }

  @Delete('products/:id')
  async deleteProduct(@Param('id') id: string) {
    return this.productsServiceService.remove(id);
  }
}
