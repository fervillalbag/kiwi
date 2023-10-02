import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateTypeProductDto, UpdateTypeProductDto } from './dto';
import { TypeProduct } from './entities/type-product.entity';

@Injectable()
export class TypeProductService {
  constructor(
    @InjectModel(TypeProduct.name)
    private readonly typeProductService: Model<TypeProduct>,
  ) {}

  async create(dto: CreateTypeProductDto) {
    try {
      const typeProduct = await this.typeProductService.create(dto);
      return typeProduct;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll() {
    try {
      const typeProducts = await this.typeProductService.find();
      return typeProducts;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findOne(id: string) {
    try {
      const typeProduct = await this.typeProductService.findById(id);
      return typeProduct;
    } catch (error) {
      this.handleException(error);
    }
  }

  async update(id: string, dto: UpdateTypeProductDto) {
    try {
      const typeProduct = await this.findOne(id);
      if (!typeProduct)
        throw new NotFoundException('Tipo de producto no encontrado');

      return this.typeProductService.findByIdAndUpdate(
        id,
        {
          ...dto,
          updatedAt: new Date(),
        },
        { new: true },
      );
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    try {
      const typeProduct = await this.findOne(id);
      if (!typeProduct)
        throw new NotFoundException('Tipo de producto no encontrado');

      return this.typeProductService.findByIdAndDelete(id);
    } catch (error) {}
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
