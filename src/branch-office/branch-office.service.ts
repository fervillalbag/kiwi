import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateBranchOfficeDto, UpdateBranchOfficeDto } from './dto';
import { BranchOffice } from './entities/branch-office.entity';

@Injectable()
export class BranchOfficeService {
  constructor(
    @InjectModel(BranchOffice.name)
    private readonly branchOfficeService: Model<BranchOffice>,
  ) {}

  async create(dto: CreateBranchOfficeDto) {
    try {
      const branchOffice = await this.branchOfficeService.create(dto);
      return branchOffice;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll() {
    try {
      const branchOffices = await this.branchOfficeService.find();
      return branchOffices;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findOne(id: string) {
    try {
      const branchOffice = await this.branchOfficeService.findById(id);
      if (!branchOffice) throw new NotFoundException('Sucursal no encontrada');

      return branchOffice;
    } catch (error) {
      this.handleException(error);
    }
  }

  async update(id: string, dto: UpdateBranchOfficeDto) {
    try {
      const branchOffice = await this.findOne(id);
      if (!branchOffice) throw new NotFoundException('Sucursal no encontrada');

      const branchOfficeUpdated = { ...dto, updatedAt: new Date() };
      return this.branchOfficeService.findByIdAndUpdate(
        id,
        branchOfficeUpdated,
        { new: true },
      );
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    try {
      const branchOffice = await this.findOne(id);
      if (!branchOffice) throw new NotFoundException('Sucursal no encontrada');

      return this.branchOfficeService.findByIdAndRemove(id);
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
