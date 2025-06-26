import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreatePurchaseDto {
  @ApiProperty({ example: 'partner_uuid' })
  @IsString()
  @IsNotEmpty()
  partnerId: string;

  @ApiProperty({ example: 'product_uuid' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 0 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  quantity: number;

  @ApiProperty({ example: 0 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  buyPrice: number;

  @ApiProperty({ example: 'comment for purchase' })
  @IsString()
  @IsOptional()
  comment?: string;
}
