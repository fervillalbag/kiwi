import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
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

  async findAll(page: number, limit: number) {
    try {
      const skip = (page - 1) * limit;

      const products = await this.productService
        .find()
        .populate('saleStatus', 'name -_id')
        .populate('statusProduct', 'name -_id')
        .populate('category', 'name')
        .populate('type', 'name -_id')
        .populate('createdAt')
        .populate('currency', 'value -_id')
        .populate('subCategory', 'name -_id')
        .populate('ad', 'name -_id')
        .populate('owner', 'fullname email username avatar -_id')
        .skip(skip)
        .limit(limit)
        .exec();
      return products;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findOne(param: string, value: string) {
    try {
      const product = await this.productService
        .findOne({ [param]: value })
        .populate('saleStatus', 'name -_id')
        .populate('statusProduct', 'name -_id')
        .populate('category', 'name')
        .populate('type', 'name -_id')
        .populate('createdAt')
        .populate('currency', 'value -_id')
        .populate('subCategory', 'name -_id')
        .populate('ad', 'name -_id')
        .populate('owner', 'fullname email username avatar');
      if (!product) throw new NotFoundException('Producto no encontrado');

      return product;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findSearch(value: string) {
    try {
      const regex = new RegExp(value, 'i');

      return this.productService
        .find({
          $or: [{ title: regex }, { description: regex }],
        })
        .populate('saleStatus', 'name -_id')
        .populate('statusProduct', 'name -_id')
        .populate('category', 'name')
        .populate('createdAt')
        .populate('type', 'name -_id')
        .populate('currency', 'value -_id')
        .populate('subCategory', 'name -_id')
        .populate('ad', 'name -_id')
        .populate('owner', 'fullname email username avatar -_id');
    } catch (error) {
      this.handleException(error);
    }
  }

  async findProductByAd(type: string, page: number, limit: number) {
    try {
      const skip = (page - 1) * limit;

      return this.productService
        .find(
          {
            $or: [{ ad: { $in: [type] } }],
          },
          { title: 1, price: 1, images: 1 },
        )
        .populate('ad', 'name -_id')
        .populate('createdAt')
        .populate('currency', '-_id value')
        .skip(skip)
        .limit(limit)
        .exec();
    } catch (error) {
      this.handleException(error);
    }
  }

  async findByUser(userId: string, page: number, limit: number) {
    try {
      const skip = (page - 1) * limit;

      const productsByUser = await this.productService
        .find({
          owner: userId,
        })
        .populate('saleStatus', 'name -_id')
        .populate('statusProduct', 'name -_id')
        .populate('category', 'name')
        .populate('type', 'name -_id')
        .populate('currency', 'value -_id')
        .populate('subCategory', 'name -_id')
        .populate('createdAt')
        .populate('ad', 'name -_id')
        .populate('owner', 'fullname email username avatar -_id')
        .skip(skip)
        .limit(limit)
        .exec();
      if (!productsByUser)
        throw new NotFoundException('Producto no encontrado');

      return productsByUser;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findByCard(page: number, limit: number) {
    try {
      const skip = (page - 1) * limit;

      const products = await this.productService
        .find({}, { title: 1, price: 1, images: 1, createdAt: 1 })
        .populate('currency', 'value -_id')
        .populate('saleStatus', 'name -_id')
        .skip(skip)
        .limit(limit)
        .exec();

      return products;
    } catch (error) {
      this.handleException(error);
    }
  }

  async update(id: string, dto: UpdateProductDto) {
    try {
      const product = await this.findOne('_id', id);
      if (!product) throw new NotFoundException('Producto no encontrado');

      const productUpdated = { ...dto, updatedAt: new Date() };

      return this.productService.findByIdAndUpdate(id, productUpdated, {
        new: true,
      });
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    try {
      const product = await this.findOne('_id', id);
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
    throw new BadRequestException(error);
  }
}
