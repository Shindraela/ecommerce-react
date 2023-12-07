import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Query,
  Res,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../interfaces/product.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get('id')
  async findById(@Res() res, @Query('id') id: string) {
    const product = await this.productsService.findById(id);
    if (!product) throw new NotFoundException('Id does not exist!');
    return res.status(HttpStatus.OK).json(product);
  }
}
