import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MessageGateway } from './message.gateway';
import { MessageService } from './message.service';
import { Message, MessageSchema } from './entities/message.entity';
import { User, UserSchema } from '../auth/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [MessageService, MessageGateway],
})
export class MessageModule {}
