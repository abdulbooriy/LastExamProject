import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: '+998507525150' })
  @IsString()
  @IsNotEmpty({ message: 'Phone Number is reduired!' })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: 'user12345' })
  @IsString({ message: 'Password must be a string!' })
  @IsNotEmpty({ message: 'Password is required!' })
  password: string;
}
