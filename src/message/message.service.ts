import { Model, ObjectId } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
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

  async findLastMessage(sender: string, receiver: string) {
    try {
      const lastMessage = await this.messageModel
        .findOne(
          {
            $or: [
              { sender: sender, receiver: receiver },
              { sender: receiver, receiver: sender },
            ],
          },
          { content: 1, createdAt: 1 },
        )
        .sort({ createdAt: -1 })
        .limit(1)
        .exec();
      return lastMessage;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findMessagesNotSeen(sender: string, receiver: string) {
    try {
      const lastMessage = await this.messageModel
        .findOne(
          {
            $or: [
              { sender: sender, receiver: receiver },
              { sender: receiver, receiver: sender },
            ],
            $and: [{ seen: false }],
          },
          { content: 1, createdAt: 1 },
        )
        .count()
        .exec();
      return lastMessage;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAllByContacts(userId: ObjectId) {
    const messages = await this.messageModel
      .find({
        $or: [{ sender: userId }, { receiver: userId }],
      })
      .lean()
      .exec();

    const uniqueContactsSet = new Set();

    messages.forEach((message) => {
      if (message.sender !== userId) {
        uniqueContactsSet.add(message.sender);
      }
      if (message.receiver !== userId) {
        uniqueContactsSet.add(message.receiver);
      }
    });

    const uniqueContacts = Array.from(uniqueContactsSet);
    const uniqueContactsString = uniqueContacts.map((objectId) =>
      objectId.toString(),
    );

    const contactsFiltered = uniqueContactsString.filter(
      (objectId) => objectId !== userId.toString(),
    );

    const uniqueContactsFiltered = Array.from(new Set(contactsFiltered));

    const infoUsers = await Promise.all(
      uniqueContactsFiltered.map(async (contact) => {
        const lastMessage = await this.findLastMessage(
          contact,
          userId.toString(),
        );
        const messagesNotSeen = await this.findMessagesNotSeen(
          contact,
          userId.toString(),
        );

        const user = await this.userModel.findOne(
          { _id: contact },
          { fullname: 1, avatar: 1 },
        );

        return { user, lastMessage, unreadMessages: messagesNotSeen };
      }),
    );

    return infoUsers;
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
