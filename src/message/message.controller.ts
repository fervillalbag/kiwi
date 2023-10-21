import { ObjectId } from 'mongoose';
import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';

import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get()
  findAll(
    @Query('sender') sender: string,
    @Query('receiver') receiver: string,
  ) {
    return this.messageService.findAll(sender, receiver);
  }

  @Get('user/:userId/contacts')
  findAllByContacts(@Param('userId') userId: ObjectId) {
    return this.messageService.findAllByContacts(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(id);
  }
}
