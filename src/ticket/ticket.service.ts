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

  create(dto: CreateTicketDto): Promise<Ticket> {
    return this.ticketService.create(dto);
  }

  async findAll(): Promise<Ticket[]> {
    try {
      const tickets = await this.ticketService
        .find()
        .populate('vendor', 'email _id username avatar fullname')
        .populate('buyer', 'email _id username avatar fullname');
      return tickets;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findOne(id: string): Promise<Ticket> {
    try {
      const ticket = await this.ticketService.findById(id);
      return ticket;
    } catch (error) {
      this.handleException(error);
    }
  }

  update(id: string, dto: UpdateTicketDto) {
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
