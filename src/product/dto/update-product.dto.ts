import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto, ProductUnits } from './create-product.dto';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ example: 'product title' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 0 })
  @Type(() => Number)
  @IsPositive()
  @IsOptional()
  sellPrice?: number;

  @ApiProperty({ example: 0 })
  @Type(() => Number)
  @IsOptional()
  buyPrice?: number;

  @ApiProperty({ example: 0 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @ApiProperty({ example: 'category_uuid' })
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
