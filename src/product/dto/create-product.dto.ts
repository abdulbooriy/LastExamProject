import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Decimal } from 'generated/prisma/runtime/library';

export enum ProductUnits {
  KG = 'KG',
  LITR = 'LITR',
  M2 = 'M2',
  PIECE = 'PIECE',
}

export class CreateProductDto {
  @ApiProperty({ example: 'Redmi Note 10 Pro' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 250000 })
  @IsPositive()
  @IsNotEmpty()
  sellPrice: Decimal;

  @ApiProperty({ example: 250000 })
  @IsPositive()
  @IsNotEmpty()
  buyPrice: Decimal;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: 'category uuid' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ example: ProductUnits.KG })
  @IsString()
  @IsNotEmpty()
  units: ProductUnits;

  @ApiProperty({ example: 'user uuid' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({ example: 'the best products with amazing discounts' })
  @IsString()
  @IsOptional()
  comment: string;

  @ApiProperty({ example: 'product image url' })
  @IsString()
  @IsNotEmpty()
  image: string;
}
