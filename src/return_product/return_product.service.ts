import { Injectable } from '@nestjs/common';
import { CreateReturnProductDto } from './dto/create-return_product.dto';
import { UpdateReturnProductDto } from './dto/update-return_product.dto';

@Injectable()
export class ReturnProductService {
  create(createReturnProductDto: CreateReturnProductDto) {
    return 'This action adds a new returnProduct';
  }

  findAll() {
    return `This action returns all returnProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} returnProduct`;
  }

  update(id: number, updateReturnProductDto: UpdateReturnProductDto) {
    return `This action updates a #${id} returnProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} returnProduct`;
  }
}
