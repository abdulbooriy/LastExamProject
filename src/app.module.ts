import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './mail/mail.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UploadImageModule } from './upload-image/upload-image.module';
import { JwtModule } from '@nestjs/jwt';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { SalaryModule } from './salary/salary.module';
import { PurchaseModule } from './purchase/purchase.module';
import { PartnerModule } from './partner/partner.module';
import { ContractModule } from './contract/contract.module';
import { ReturnProductModule } from './return_product/return_product.module';
import { DebtModule } from './debt/debt.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    AuthModule,
    PrismaModule,
    MailModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/file',
    }),
    UploadImageModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '50m' },
    }),
    CategoryModule,
    ProductModule,
    SalaryModule,
    PurchaseModule,
    PartnerModule,
    ContractModule,
    ReturnProductModule,
    DebtModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
