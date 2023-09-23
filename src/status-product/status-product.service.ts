import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateStatusProductDto, UpdateStatusProductDto } from './dto';
import { StatusProduct } from './entities/status-product.entity';

@Injectable()
export class StatusProductService {
  constructor(
    @InjectRepository(StatusProduct)
    private readonly statusProductService: Repository<StatusProduct>,
  ) {}

  async create(createStatusProductDto: CreateStatusProductDto) {
    const statusProduct = this.statusProductService.create({
      ...createStatusProductDto,
    });
    await this.statusProductService.save(statusProduct);
    return statusProduct;
  }

  findAll() {
    return this.statusProductService.find();
  }

  findOne(id: string) {
    return this.statusProductService.findOneBy({ id });
  }

  async update(id: string, updateStatusProductDto: UpdateStatusProductDto) {
    const statusProduct = await this.findOne(id);

    if (!statusProduct)
      throw new NotFoundException('Estado de producto no encontrado');

    Object.assign(statusProduct, updateStatusProductDto);
    return await this.statusProductService.save(statusProduct);
  }

  async remove(id: string) {
    const statusProduct = await this.findOne(id);

    if (!statusProduct)
      throw new NotFoundException('Estado de producto no encontrado');

    return await this.statusProductService.remove(statusProduct);
  }
}
