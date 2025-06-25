import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReturnProductService } from './return_product.service';
import { CreateReturnProductDto } from './dto/create-return_product.dto';
import { UpdateReturnProductDto } from './dto/update-return_product.dto';

@Controller('return-product')
export class ReturnProductController {
  constructor(private readonly returnProductService: ReturnProductService) {}

  @Post()
  create(@Body() createReturnProductDto: CreateReturnProductDto) {
    return this.returnProductService.create(createReturnProductDto);
  }

  @Get()
  findAll() {
    return this.returnProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.returnProductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReturnProductDto: UpdateReturnProductDto) {
    return this.returnProductService.update(+id, updateReturnProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.returnProductService.remove(+id);
  }
}
