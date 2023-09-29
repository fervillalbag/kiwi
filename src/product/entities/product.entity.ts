import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
  @Prop({ type: 'string', required: true })
  measureType: string;

  @Prop({ type: 'string', required: true })
  title: string;

  @Prop({ type: 'string', required: true })
  statusProduct: string; /* 1 */

  @Prop({ type: 'string', required: true })
  category: string; /* 2 */

  @Prop({ type: 'string', required: true })
  subCategory: string; /* 3 */

  @Prop({ type: 'string', required: true })
  currency: string; /* 4 */

  @Prop({ type: 'string', required: true })
  type: string; /* 5 */

  @Prop({ type: 'string', required: true })
  saleStatus: string; /* 6 */

  @Prop({ type: 'string', required: true })
  owner: string; /* 7 */

  @Prop({ type: 'string', required: true })
  description: string;

  @Prop({ type: 'number', required: true })
  price: number;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.set('versionKey', false);
