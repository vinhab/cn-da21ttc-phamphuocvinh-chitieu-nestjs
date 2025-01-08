import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { IncomeService } from './income.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';

@Controller('incomes')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  create(@Body() createIncomeDto: CreateIncomeDto) {
    return this.incomeService.create(createIncomeDto);
  }

  @Get()
  findAll() {
    return this.incomeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incomeService.findOne(id);
  }



  @Put(':id')
  update(@Param('id') id: string, @Body() updateIncomeDto: UpdateIncomeDto) {
    return this.incomeService.update(id, updateIncomeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incomeService.remove(id);
  }

  // Endpoint để lấy tổng thu nhập của người dùng
  @Get('total/:userId')
  async getTotalIcome(@Param('userId') userId: string): Promise<number> {
    return this.incomeService.getTotalImcome(userId);
  }

  // Endpoint để lấy tất cả chi tiêu của người dùng
  @Get('user/:userId')
  async getIcomesByUser(@Param('userId') userId: string) {
    return this.incomeService.getImcomesByUser(userId);
  }

  @Get('total/:userId/:year/:month')
  async getTotalIncome(
    @Param('userId') userId: string,
    @Param('year') year: number,
    @Param('month') month: number,
  ) {
    return this.incomeService.getTotalIcomeYearAndMoth(userId, year, month);
  }

  @Get('user/:userId/incomes/:year/:month')
  async getExpensesByMonth(
    @Param('userId') userId: string,
    @Param('year') year: number,
    @Param('month') month: number,
  ) {
    return this.incomeService.getIncomesByMonth(userId, year, month);
  }
}
