import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSalaryDto } from './create-salary.dto';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSalaryDto extends PartialType(CreateSalaryDto) {
  @ApiProperty({ example: 'user_uuid' })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiProperty({ example: 0 })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsOptional()
  amount?: number;

  @ApiProperty({
    example: 'comments for salary',
    required: false,
  })
  @IsString()
  @IsOptional()
  comment?: string;
}
