import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSalaryDto {
  @ApiProperty({ example: 'user uuid' })
  @IsString()
  userId: string;

  @ApiProperty({ example: 100000.0 })
  @IsNotEmpty()
  @Type(() => Number)
  amount: number;

  @ApiProperty({
    example: 'June month',
    required: false,
  })
  @IsString()
  @IsOptional()
  comment: string;
}
