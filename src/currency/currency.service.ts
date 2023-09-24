import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateCurrencyDto, UpdateCurrencyDto } from './dto';
import { Currency } from './entities/currency.entity';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private readonly currencyService: Repository<Currency>,
  ) {}

  async create(createCurrencyDto: CreateCurrencyDto) {
    const currency = this.currencyService.create({
      ...createCurrencyDto,
    });
    await this.currencyService.save(currency);
    return currency;
  }

  findAll() {
    return this.currencyService.find();
  }

  findOne(id: string) {
    return this.currencyService.findOneBy({ id });
  }

  async update(id: string, updateCurrencyDto: UpdateCurrencyDto) {
    const currency = await this.findOne(id);

    if (!currency) throw new NotFoundException('Moneda no encontrada');

    Object.assign(currency, updateCurrencyDto);
    return await this.currencyService.save(currency);
  }

  async remove(id: string) {
    const currency = await this.findOne(id);
    if (!currency) throw new NotFoundException('Moneda no encontrada');

    return await this.currencyService.remove(currency);
  }
}
