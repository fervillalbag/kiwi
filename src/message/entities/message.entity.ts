import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Message {
  @Prop({ type: String, required: true })
  content: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  receiver: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  sender: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  seen: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
MessageSchema.set('versionKey', false);
