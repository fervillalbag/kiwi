import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productService: Model<Product>,
  ) {}

  async create(dto: CreateProductDto) {
    try {
      const product = await this.productService.create(dto);
      return product;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll() {
    try {
      const products = await this.productService.find();
      return products;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.productService.findById(id);
      if (!product) throw new NotFoundException('Producto no encontrado');

      return product;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findByUser(userId: string) {
    try {
      const productsByUser = await this.productService.find({
        owner: userId,
      });
      if (!productsByUser)
        throw new NotFoundException('Producto no encontrado');

      return productsByUser;
    } catch (error) {
      this.handleException(error);
    }
  }

  async update(id: string, dto: UpdateProductDto) {
    try {
      const product = await this.findOne(id);
      if (!product) throw new NotFoundException('Producto no encontrado');

      return this.productService.findByIdAndUpdate(
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
      const product = await this.findOne(id);
      if (!product) throw new NotFoundException('Producto no encontrado');

      return this.productService.findByIdAndDelete(id);
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
    throw new InternalServerErrorException(
      'No se pudo crear el genero - Revisar la consola',
    );
  }
}
