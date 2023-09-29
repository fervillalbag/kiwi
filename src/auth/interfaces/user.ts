import { IGender } from '../../gender/interfaces/gender.interface';
import { ISkin } from '../../skin/interfaces/skin.interface';

export interface IUser {
  _id?: string;
  email: string;
  fullname: string;
  password: string;
  username: string;
  isActive: boolean;
  banner: string;
  avatar: string;
  verified: boolean;
  gender: IGender;
  skin: ISkin;
  affiliated: string;
  roles: string[];
  topics: string[];
  createdAt: Date;
  updatedAt: Date;
}
