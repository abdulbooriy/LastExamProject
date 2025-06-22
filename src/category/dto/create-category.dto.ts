import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'fruits' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 4 })
  @IsNumber()
  @IsPositive()
  time: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ example: 'category image url' })
  @IsString()
  @IsNotEmpty()
  image: string;
}
