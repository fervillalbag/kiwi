import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class TypeProduct {
  @Prop({ type: 'string', unique: true })
  name: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const TypeProductSchema = SchemaFactory.createForClass(TypeProduct);
TypeProductSchema.set('versionKey', false);
