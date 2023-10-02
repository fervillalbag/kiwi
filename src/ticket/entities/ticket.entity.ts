import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Ticket {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  vendor: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  buyer: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  })
  product: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: 'string',
    required: true,
  })
  status: string;

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
TicketSchema.set('versionKey', false);
