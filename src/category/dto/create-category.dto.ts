import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'category title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'category image url' })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ example: 0 })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  time: number;
}
