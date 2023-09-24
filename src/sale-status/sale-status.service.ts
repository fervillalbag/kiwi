import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateSaleStatusDto, UpdateSaleStatusDto } from './dto/';
import { SaleStatus } from './entities/sale-status.entity';

@Injectable()
export class SaleStatusService {
  constructor(
    @InjectRepository(SaleStatus)
    private readonly saleStatusService: Repository<SaleStatus>,
  ) {}

  async create(createSaleStatusDto: CreateSaleStatusDto) {
    const saleStatus = this.saleStatusService.create({
      ...createSaleStatusDto,
    });
    await this.saleStatusService.save(saleStatus);
    return saleStatus;
  }

  findAll() {
    return this.saleStatusService.find();
  }

  findOne(id: string) {
    return this.saleStatusService.findOneBy({ id });
  }

  async update(id: string, updateSaleStatusDto: UpdateSaleStatusDto) {
    const saleStatus = await this.findOne(id);

    if (!saleStatus)
      throw new NotFoundException('Estado de producto no encontrado');

    Object.assign(saleStatus, updateSaleStatusDto);
    return await this.saleStatusService.save(saleStatus);
  }

  async remove(id: string) {
    const saleStatus = await this.findOne(id);

    if (!saleStatus)
      throw new NotFoundException('Estado de producto no encontrado');

    return await this.saleStatusService.remove(saleStatus);
  }
}
