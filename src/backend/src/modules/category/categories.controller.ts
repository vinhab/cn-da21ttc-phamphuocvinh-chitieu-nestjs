import { Controller, Get, Post, Body, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schemas/category.schema';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  // Lấy tất cả danh mục theo userId
  @Get('user/:userId')
  async findAllByUserId(@Param('userId') userId: string): Promise<Category[]> {
    return this.categoriesService.findAllByUserId(userId);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    if (!id) {
      throw new NotFoundException('ID is required');
    }
    return this.categoriesService.delete(id);
  }
}
