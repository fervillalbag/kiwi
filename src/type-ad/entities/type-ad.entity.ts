import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class TypeAd {
  @Prop({ type: 'string', unique: true })
  name: string;

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt: Date;
}

export const TypeAdSchema = SchemaFactory.createForClass(TypeAd);
TypeAdSchema.set('versionKey', false);
