import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from '../interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCT_MODEL') private readonly productModel: Model<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async findById(id): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    return product;
  }

  async findQuery(query): Promise<Product[]> {
    const products = await this.productModel.find({ ...query });
    return products;
  }
}
