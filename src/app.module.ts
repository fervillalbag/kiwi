import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { GenderModule } from './gender/gender.module';
import { SkinModule } from './skin/skin.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { StatusProductModule } from './status-product/status-product.module';
import { CurrencyModule } from './currency/currency.module';
import { TypeProductModule } from './type-product/type-product.module';
import { SaleStatusModule } from './sale-status/sale-status.module';
import { TypeAdModule } from './type-ad/type-ad.module';
import { EnvConfiguration } from './config/app.config';
import { JoinValidationSchema } from './config/joi.validation';
import { BranchOfficeModule } from './branch-office/branch-office.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoinValidationSchema,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB),
    GenderModule,
    AuthModule,
    SkinModule,
    ProductModule,
    CategoryModule,
    SubCategoryModule,
    StatusProductModule,
    CurrencyModule,
    TypeProductModule,
    SaleStatusModule,
    TypeAdModule,
    BranchOfficeModule,
  ],
})
export class AppModule {}
