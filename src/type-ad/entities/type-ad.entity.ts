import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class TypeAd {
  @Prop({ type: 'string', unique: true })
  name: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const TypeAdSchema = SchemaFactory.createForClass(TypeAd);
TypeAdSchema.set('versionKey', false);
