import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Query,
  Res,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from '../interfaces/category.interface';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get('id')
  async findById(@Res() res, @Query('id') id: string) {
    const category = await this.categoriesService.findById(id);
    if (!category) throw new NotFoundException('Id does not exist!');
    return res.status(HttpStatus.OK).json(category);
  }
}
