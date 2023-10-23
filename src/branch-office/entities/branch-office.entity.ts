import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class BranchOffice {
  @Prop({ type: 'string', required: true })
  name: string;

  @Prop({ type: 'string', required: true })
  city: string;

  @Prop({ type: 'string', required: true })
  district: string;

  @Prop({ type: 'number' })
  longitude: number;

  @Prop({ type: 'number' })
  latitude: number;

  @Prop({ type: 'string' })
  image: string;

  @Prop({ type: 'string', required: true })
  business: string;

  @Prop({ type: 'string', required: true })
  address: string;

  @Prop({ type: 'string', required: true })
  contact_info: string;

  @Prop({ type: 'string', required: true })
  schedule: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const BranchOfficeSchema = SchemaFactory.createForClass(BranchOffice);
BranchOfficeSchema.set('versionKey', false);
