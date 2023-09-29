import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Skin {
  @Prop({ type: 'string' })
  name: string;

  @Prop({ type: 'string' })
  description: string;

  @Prop({ type: 'string' })
  image: string;

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt: Date;
}

export const SkinSchema = SchemaFactory.createForClass(Skin);
SkinSchema.set('versionKey', false);
