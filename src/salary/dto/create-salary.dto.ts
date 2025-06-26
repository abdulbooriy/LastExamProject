import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateSalaryDto {
  @ApiProperty({ example: 'user_uuid' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ default: 0 })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: 'comments for salary',
    required: false,
  })
  @IsString()
  @IsOptional()
  comment: string;
}
