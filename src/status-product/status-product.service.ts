import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateStatusProductDto, UpdateStatusProductDto } from './dto';
import { StatusProduct } from './entities/status-product.entity';

@Injectable()
export class StatusProductService {
  constructor(
    @InjectModel(StatusProduct.name)
    private readonly statusProductService: Model<StatusProduct>,
  ) {}

  async create(dto: CreateStatusProductDto) {
    try {
      const statusProduct = await this.statusProductService.create(dto);
      return statusProduct;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll() {
    try {
      const statusProducts = await this.statusProductService.find();
      return statusProducts;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findOne(id: string) {
    try {
      const statusProduct = await this.statusProductService.findById(id);
      return statusProduct;
    } catch (error) {
      this.handleException(error);
    }
  }

  async update(id: string, dto: UpdateStatusProductDto) {
    try {
      const statusProduct = await this.findOne(id);
      if (!statusProduct)
        throw new NotFoundException('El estado de producto no existe');

      return this.statusProductService.findByIdAndUpdate(
        id,
        {
          ...dto,
          updatedAt: new Date(),
        },
        {
          new: true,
        },
      );
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    try {
      const statusProduct = await this.findOne(id);
      if (!statusProduct)
        throw new NotFoundException('El estado de producto no existe');

      return this.statusProductService.findByIdAndDelete(id);
    } catch (error) {
      this.handleException(error);
    }
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `El genero ya existe en la base de datos ${JSON.stringify(
          error.keyValue,
        )}`,
      );
    }

    console.log(error);
    throw new BadRequestException(error);
  }
}
