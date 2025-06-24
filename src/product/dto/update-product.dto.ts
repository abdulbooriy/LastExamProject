import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto, ProductUnits } from './create-product.dto';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Decimal } from 'generated/prisma/runtime/library';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ example: 'Redmi Note 10 Pro' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 250000 })
  @IsPositive()
  @IsOptional()
  sellPrice?: Decimal;

  @ApiProperty({ example: 250000 })
  @IsPositive()
  @IsOptional()
  buyPrice?: Decimal;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  quantity?: number;

  @ApiProperty({ example: 'category uuid' })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({ example: ProductUnits.KG })
  @IsString()
  @IsOptional()
  units?: ProductUnits;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ example: 'comments for product' })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty({ example: 'product image url' })
  @IsString()
  @IsOptional()
  image?: string;
}
