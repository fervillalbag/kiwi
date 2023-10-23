import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class SubCategory {
  @Prop({ type: 'string', unique: true })
  name: string;

  @Prop({ type: 'string', nullable: true })
  description?: string;

  @Prop({ type: 'string', required: true })
  category: string;

  @Prop({ type: 'string', nullable: true })
  image?: string;

  @Prop({ type: 'boolean', default: true })
  isActive: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
SubCategorySchema.set('versionKey', false);
