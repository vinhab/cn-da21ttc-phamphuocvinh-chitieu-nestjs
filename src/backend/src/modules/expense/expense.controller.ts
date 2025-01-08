import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ExpensesService } from './expense.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Body() createExpenseDto: any) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  findAll() {
    return this.expensesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: any) {
    return this.expensesService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesService.remove(id);
  }

  // Endpoint để lấy tổng thu nhập của người dùng
  @Get('total/:userId')
  async getTotalExpense(@Param('userId') userId: string): Promise<number> {
    return this.expensesService.getTotalExpense(userId);
  }

  // Endpoint để lấy tất cả chi tiêu của người dùng
  @Get('user/:userId')
  async getExpensesByUser(@Param('userId') userId: string) {
    return this.expensesService.getExpensesByUser(userId);
  }

  // Lấy tổng chi tiêu của người dùng theo năm và tháng
  @Get('total/expenses/:userId/:year/:month')
  async getTotalExpensesByMonth(
    @Param('userId') userId: string,
    @Param('year') year: number,
    @Param('month') month: number,
  ): Promise<number> {
    return this.expensesService.getTotalExpensesByMonth(userId, year, month);
  }

  @Get('user/:userId/expenses/:year/:month')
  async getExpensesByMonth(
    @Param('userId') userId: string,
    @Param('year') year: number,
    @Param('month') month: number,
  ) {
    return this.expensesService.getExpensesByMonth(userId, year, month);
  }
}
