import { Module } from '@nestjs/common';
import { ReturnProductService } from './return_product.service';
import { ReturnProductController } from './return_product.controller';

@Module({
  controllers: [ReturnProductController],
  providers: [ReturnProductService],
})
export class ReturnProductModule {}
