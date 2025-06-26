import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSalaryDto {
  @ApiProperty({ example: 'user_uuid' })
  @IsString()
  userId: string;

  @ApiProperty({ default: 0 })
  @IsNotEmpty()
  @Type(() => Number)
  amount: number;

  @ApiProperty({
    example: 'comments for salary',
    required: false,
  })
  @IsString()
  @IsOptional()
  comment: string;
}
