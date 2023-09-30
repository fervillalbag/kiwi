import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { CreateCurrencyDto, UpdateCurrencyDto } from './dto';
import { Currency } from './entities/currency.entity';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectModel(Currency.name)
    private readonly currencyService: Model<Currency>,
  ) {}

  async create(dto: CreateCurrencyDto) {
    try {
      const currency = await this.currencyService.create(dto);
      return currency;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll() {
    try {
      const currencies = await this.currencyService.find();
      return currencies;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findOne(id: string) {
    try {
      const currency = await this.currencyService.findById(id);
      if (!currency) throw new NotFoundException('Moneda no encontrada');

      return currency;
    } catch (error) {
      this.handleException(error);
    }
  }

  async update(id: string, dto: UpdateCurrencyDto) {
    try {
      const currency = await this.findOne(id);
      if (!currency) throw new NotFoundException('Moneda no encontrada');

      return this.currencyService.findByIdAndUpdate(
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
      const currency = await this.currencyService.findById(id);
      if (!currency) throw new NotFoundException('Moneda no encontrada');

      return this.currencyService.findByIdAndDelete(id);
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
