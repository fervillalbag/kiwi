import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Gender {
  @Prop({ type: 'string', unique: true })
  name: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const GenderSchema = SchemaFactory.createForClass(Gender);
GenderSchema.set('versionKey', false);
