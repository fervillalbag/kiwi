import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTypeProductDto, UpdateTypeProductDto } from './dto';
import { TypeProduct } from './entities/type-product.entity';

@Injectable()
export class TypeProductService {
  constructor(
    @InjectRepository(TypeProduct)
    private readonly typeProductService: Repository<TypeProduct>,
  ) {}

  async create(createTypeProductDto: CreateTypeProductDto) {
    const typeProduct = this.typeProductService.create({
      ...createTypeProductDto,
    });
    await this.typeProductService.save(typeProduct);
    return typeProduct;
  }

  findAll() {
    return this.typeProductService.find();
  }

  findOne(id: string) {
    return this.typeProductService.findOneBy({ id });
  }

  async update(id: string, updateTypeProductDto: UpdateTypeProductDto) {
    const typeProduct = await this.findOne(id);

    if (!typeProduct)
      throw new NotFoundException('Tipo de producto no encontrado');

    Object.assign(typeProduct, updateTypeProductDto);
    return await this.typeProductService.save(typeProduct);
  }

  async remove(id: string) {
    const typeProduct = await this.findOne(id);

    if (!typeProduct)
      throw new NotFoundException('Tipo de producto no encontrado');

    return await this.typeProductService.remove(typeProduct);
  }
}
