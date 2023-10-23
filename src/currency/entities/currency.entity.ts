import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Currency {
  @Prop({ type: 'string', unique: true })
  name: string;

  @Prop({ type: 'string', unique: true })
  value: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);
CurrencySchema.set('versionKey', false);
