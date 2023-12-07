import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Category } from '../interfaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CATEGORY_MODEL') private readonly categoryModel: Model<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find().exec();
  }

  async findById(id): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();
    return category;
  }
}
