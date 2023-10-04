import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.productService.findAll(+page, +limit);
  }

  @Get('single')
  findOne(@Query() query: string) {
    const param = Object.keys(query)[0];
    const value = Object.values(query)[0];

    return this.productService.findOne(param, value);
  }

  @Get('search')
  findSearch(@Query('value') value: string) {
    return this.productService.findSearch(value);
  }

  @Get('user/:id')
  findByUser(
    @Param('id') id: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.productService.findByUser(id, +page, +limit);
  }

  @Get('card')
  findByCard(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.productService.findByCard(+page, +limit);
  }

  @Get('ad/:type')
  findProductByAd(
    @Param('type') type: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.productService.findProductByAd(type, +page, +limit);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
