import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  _id?: string;

  @Prop({ type: 'string', unique: true })
  email: string;

  @Prop({ type: 'string' })
  fullname: string;

  @Prop({ type: 'string' })
  password: string;

  @Prop({ type: 'string', unique: true })
  username: string;

  @Prop({ type: 'boolean', default: true })
  isActive: boolean;

  @Prop({ type: 'string' })
  banner?: string;

  @Prop({ type: [String] })
  branch_offices?: string[];

  @Prop({ type: 'string' })
  avatar?: string;

  @Prop({ type: 'boolean' })
  verified?: boolean;

  @Prop({ type: 'string' })
  gender: string;

  @Prop({ type: 'string' })
  skin?: string;

  @Prop({ type: 'boolean' })
  affiliated: boolean;

  @Prop({ type: [String], default: [] })
  roles: string[];

  @Prop({ type: [String], default: [] })
  topics: string[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('versionKey', false);
