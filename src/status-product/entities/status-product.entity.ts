import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class StatusProduct {
  @Prop({ type: 'string', unique: true })
  name: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const StatusProductSchema = SchemaFactory.createForClass(StatusProduct);
StatusProductSchema.set('versionKey', false);
