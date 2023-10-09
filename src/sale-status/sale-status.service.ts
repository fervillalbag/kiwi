import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateSaleStatusDto, UpdateSaleStatusDto } from './dto/';
import { SaleStatus } from './entities/sale-status.entity';

@Injectable()
export class SaleStatusService {
  constructor(
    @InjectModel(SaleStatus.name)
    private readonly saleStatusService: Model<SaleStatus>,
  ) {}

  async create(dto: CreateSaleStatusDto) {
    try {
      const saleStatus = await this.saleStatusService.create(dto);
      return saleStatus;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll() {
    try {
      const salesStatus = await this.saleStatusService.find();
      return salesStatus;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findOne(id: string) {
    try {
      const saleStatus = await this.saleStatusService.findById(id);
      return saleStatus;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findOneByName(name: string) {
    try {
      const saleStatus = await this.saleStatusService.findOne({
        name,
      });
      return saleStatus;
    } catch (error) {
      this.handleException(error);
    }
  }

  async update(id: string, dto: UpdateSaleStatusDto) {
    try {
      const saleStatus = await this.findOne(id);
      if (!saleStatus)
        throw new NotFoundException('El estado de la oferta no existe');

      return this.saleStatusService.findByIdAndUpdate(
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
      const saleStatus = await this.findOne(id);
      if (!saleStatus)
        throw new NotFoundException('El estado de la oferta no existe');

      return this.saleStatusService.findByIdAndDelete(id);
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
