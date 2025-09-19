/* eslint-disable */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  productCode: string;

  @Column({ length: 200 })
  productName: string;

  @Column('text')
  productDescription: string;

  @Column('decimal', { precision: 10, scale: 2 })
  productRate: number;

  @Column({ nullable: true, length: 500 })
  productImage: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
