import { IUser } from '../../auth/interfaces/user';
import { ICategory } from '../../category/interfaces/category.interface';
import { ICurrency } from '../../currency/interfaces/currency.interface';
import { ISaleStatus } from '../../sale-status/interfaces/sale-status.interface';
import { IStatusProduct } from '../../status-product/interfaces/status-product.interface';
import { ISubCategory } from '../../sub-category/interfaces/sub-category.interface';
import { ITypeProduct } from '../../type-product/interfaces/type-product.interface';

export interface IProduct {
  _id?: string;
  measureType: string;
  title: string;
  statusProduct: IStatusProduct;
  category: ICategory;
  subCategory: ISubCategory;
  currency: ICurrency;
  type: ITypeProduct;
  saleStatus: ISaleStatus;
  owner: IUser;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}
