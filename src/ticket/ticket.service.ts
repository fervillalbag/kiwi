import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateTicketDto, UpdateTicketDto } from './dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name) private readonly ticketService: Model<Ticket>,
  ) {}

  create(dto: CreateTicketDto) {
    return this.ticketService.create(dto);
  }

  findAll() {
    return `This action returns all ticket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, dto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  async remove(id: string) {
    try {
      const ticket = await this.ticketService.findById(id);
      if (!ticket) throw new NotFoundException('Ticket no encontrado');

      return this.ticketService.findByIdAndDelete(id);
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
