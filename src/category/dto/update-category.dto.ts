import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({ example: 'fruits' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'category image url' })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ example: 4 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  time?: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
