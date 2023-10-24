import { ObjectId } from 'mongoose';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = await this.messageService.create(createMessageDto);
    this.server.emit('message', message);
    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll(@MessageBody() data: { sender: string; receiver: string }) {
    const { sender, receiver } = data;
    return this.messageService.findAll(sender, receiver);
  }

  @SubscribeMessage('markMessagesAsSeen')
  markMessagesAsSeen(
    @MessageBody() data: { sender: string; receiver: string },
  ) {
    const { sender, receiver } = data;
    return this.messageService.markMessagesAsSeen(sender, receiver);
  }

  @SubscribeMessage('findAllContacts')
  findAllByContacts(@MessageBody() userId: ObjectId) {
    return this.messageService.findAllByContacts(userId);
  }

  @SubscribeMessage('findAMessage')
  findOne(@MessageBody() id: string) {
    return this.messageService.findOne(id);
  }
}
