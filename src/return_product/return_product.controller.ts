import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReturnProductService } from './return_product.service';
import { CreateReturnProductDto } from './dto/create-return_product.dto';
import { UpdateReturnProductDto } from './dto/update-return_product.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/guards/role.decorator';
import { UserRole } from 'src/user/dto/create-user.dto';

@Controller('return-product')
export class ReturnProductController {
  constructor(private readonly returnProductService: ReturnProductService) {}

  @Roles(UserRole.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createReturnProductDto: CreateReturnProductDto) {
    return this.returnProductService.create(createReturnProductDto);
  }

  @Roles(UserRole.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.returnProductService.findAll();
  }

  @Roles(UserRole.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.returnProductService.findOne(id);
  }

  @Roles(UserRole.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReturnProductDto: UpdateReturnProductDto,
  ) {
    return this.returnProductService.update(id, updateReturnProductDto);
  }

  @Roles(UserRole.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.returnProductService.remove(id);
  }
}
