import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Gender {
  @Prop({ unique: true, index: true })
  name: string;

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt: Date;
}

export const GenderSchema = SchemaFactory.createForClass(Gender);
GenderSchema.set('versionKey', false);
