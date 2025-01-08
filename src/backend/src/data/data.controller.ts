import { Controller, Get, Param } from '@nestjs/common';
import { IncomeService } from '../modules/income/income.service';
import { ExpensesService } from '../modules/expense/expense.service';

@Controller('data')
export class DataController {
  constructor(
    private readonly incomeService: IncomeService,
    private readonly expenseService: ExpensesService,
  ) {}

  // API lấy tổng thu nhập theo tháng và năm
  @Get('income/:userId/:month/:year')
  async getTotalIncome(
    @Param('userId') userId: string,
    @Param('month') month: number,
    @Param('year') year: number,
  ): Promise<number> {
    return this.incomeService.getTotalIncomeByMonth(userId, month, year);
  }

  // API lấy tổng chi tiêu theo tháng và năm
  @Get('expense/:userId/:month/:year')
  async getTotalExpense(
    @Param('userId') userId: string,
    @Param('month') month: number,
    @Param('year') year: number,
  ): Promise<number> {
    return this.expenseService.getTotalExpenseByMonth(userId, month, year);
  }
   // API lấy dữ liệu thu nhập và chi tiêu cho tất cả các tháng trong năm
   @Get('income-expense/:userId/:year')
   async getIncomeExpenseData(
     @Param('userId') userId: string,
     @Param('year') year: number,
   ): Promise<{ month: string; income: number; expense: number }[]> {
     const months = [
       'January', 'February', 'March', 'April', 'May', 'June', 
       'July', 'August', 'September', 'October', 'November', 'December'
     ];
     
     const data = [];
 
     // Lặp qua tất cả các tháng trong năm
     for (let month = 1; month <= 12; month++) {
       const income = await this.incomeService.getTotalIncomeByMonth(userId, month, year);
       const expense = await this.expenseService.getTotalExpenseByMonth(userId, month, year);
 
       data.push({
         month: months[month - 1],
         income,
         expense,
       });
     }
 
     return data;
   }
}
