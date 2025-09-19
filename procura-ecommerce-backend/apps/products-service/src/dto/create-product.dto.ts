/* eslint-disable */
import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  MinLength,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'PROD001' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  productCode: string;

  @ApiProperty({ example: 'iPhone 15' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  productName: string;

  @ApiProperty({ example: 'Latest iPhone with amazing features' })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  productDescription: string;

  @ApiProperty({ example: 999.99 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  productRate: number;

  @ApiProperty({ example: 'https://example.com/iphone.jpg', required: false })
  @IsOptional()
  @IsString()
  productImage?: string;
}
