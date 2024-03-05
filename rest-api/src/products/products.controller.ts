import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
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

  @Get('findByFilter')
  async findByFilter(
    @Query() query: { [key: string]: string },
  ): Promise<Product[]> {
    return this.productsService.findQuery({ ...query });
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res): Promise<Product> {
    const product = await this.productsService.findById(id);
    if (!product) throw new NotFoundException('Id does not exist!');

    return res.status(HttpStatus.OK).json(product);
  }
}
