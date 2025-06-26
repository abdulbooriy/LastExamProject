import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum ProductUnits {
  KG = 'KG',
  LITR = 'LITR',
  M2 = 'M2',
  PIECE = 'PIECE',
}

export class CreateProductDto {
  @ApiProperty({ example: 'product title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 0 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  sellPrice: number;

  @ApiProperty({ example: 0 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  buyPrice: number;

  @ApiProperty({ example: 0 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: 'category_uuid' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ example: ProductUnits.KG })
  @IsNotEmpty()
  units: ProductUnits;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({ example: 'comments for products' })
  @IsString()
  @IsOptional()
  comment: string;

  @ApiProperty({ example: 'product image url' })
  @IsString()
  @IsOptional()
  image: string;
}
