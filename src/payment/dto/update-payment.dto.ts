import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  CreatePaymentDto,
  PaymentType,
  TypePayment,
} from './create-payment.dto';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @ApiProperty({ example: 'partner_uuid' })
  @IsString()
  @IsOptional()
  partnerId?: string;

  @ApiProperty({ example: 'debt_uuid' })
  @IsString()
  @IsOptional()
  debtId?: string;

  @ApiProperty({ example: 0 })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsOptional()
  amount?: number;

  @ApiProperty({ example: 'comments for payments' })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty({ example: PaymentType.CASH })
  @IsString()
  @IsOptional()
  paymentType?: PaymentType;

  @ApiProperty({ example: TypePayment.IN })
  @IsString()
  @IsOptional()
  type?: TypePayment;
}
