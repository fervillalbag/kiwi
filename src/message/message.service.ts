import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  async create(dto: CreateMessageDto) {
    try {
      const message = await this.messageModel.create(dto);
      return message;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll(sender: string, receiver: string) {
    try {
      const messages = await this.messageModel
        .find({
          $or: [
            { sender: sender, receiver: receiver },
            { sender: receiver, receiver: sender },
          ],
        })
        .exec();
      return messages;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findOne(id: string) {
    try {
      const message = await this.messageModel.findById(id);
      return message;
    } catch (error) {
      this.handleException(error);
    }
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `El mensaje ya existe en la base de datos ${JSON.stringify(
          error.keyValue,
        )}`,
      );
    }

    console.log(error);
    throw new BadRequestException(error);
  }
}
