import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSalaryDto } from './create-salary.dto';
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSalaryDto extends PartialType(CreateSalaryDto) {
  @ApiProperty({ example: 'user uuid' })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiProperty({ example: 100000.0 })
  @IsOptional()
  @Type(() => Number)
  amount?: number;

  @ApiProperty({
    example: 'comments for salary',
    required: false,
  })
  @IsString()
  @IsOptional()
  comment?: string;
}
