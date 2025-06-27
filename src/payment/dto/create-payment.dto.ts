import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum PaymentType {
  CASH = 'CASH',
  CARD = 'CARD',
}

export enum TypePayment {
  IN = 'IN',
  OUT = 'OUT',
}

export class CreatePaymentDto {
  @ApiProperty({ example: 'partner_uuid' })
  @IsString()
  @IsNotEmpty()
  partnerId: string;

  @ApiProperty({ example: 'debt_uuid' })
  @IsString()
  @IsNotEmpty()
  debtId: string;

  @ApiProperty({ example: 0 })
  @Type(() => Number)
  @IsNumber()
  // @IsPositive()
  amount: number;

  @ApiProperty({ example: 'comment for payment' })
  @IsString()
  @IsOptional()
  comment: string;

  @ApiProperty({ example: PaymentType.CASH })
  @IsString()
  @IsNotEmpty()
  paymentType: PaymentType;

  @ApiProperty({ example: TypePayment.IN })
  @IsString()
  @IsNotEmpty()
  type: TypePayment;
}
