import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class StatusProduct {
  @Prop({ type: 'string', unique: true })
  name: string;

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt: Date;
}

export const StatusProductSchema = SchemaFactory.createForClass(StatusProduct);
StatusProductSchema.set('versionKey', false);
