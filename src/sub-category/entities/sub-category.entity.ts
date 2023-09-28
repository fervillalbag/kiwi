import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class SubCategory {
  @Prop({ type: 'string', unique: true })
  name: string;

  @Prop({ type: 'string', nullable: true })
  description?: string;

  @Prop({ type: 'string', nullable: true })
  image?: string;

  @Prop({ type: 'boolean', default: true })
  isActive: boolean;

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt: Date;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
