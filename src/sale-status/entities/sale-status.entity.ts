import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class SaleStatus {
  @Prop({ type: 'string', unique: true })
  name: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const SaleStatusSchema = SchemaFactory.createForClass(SaleStatus);
SaleStatusSchema.set('versionKey', false);
