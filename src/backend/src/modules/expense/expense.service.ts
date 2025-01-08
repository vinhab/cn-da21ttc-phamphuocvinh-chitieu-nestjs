import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense } from './schemas/expense.schema';

@Injectable()
export class ExpensesService {
  constructor(@InjectModel(Expense.name) private readonly expenseModel: Model<Expense>) {}

  // Thêm khoản chi
  async create(createExpenseDto: any): Promise<Expense> {
    const expense = new this.expenseModel(createExpenseDto);
    return expense.save();
  }

  // Lấy danh sách khoản chi
  async findAll(): Promise<Expense[]> {
    return this.expenseModel.find().exec();
  }

  // Lấy thông tin một khoản chi
  async findOne(id: string): Promise<Expense> {
    const expense = await this.expenseModel.findById(id).exec();
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    return expense;
  }

  // Cập nhật khoản chi
  async update(id: string, updateExpenseDto: any): Promise<Expense> {
    const expense = await this.expenseModel.findByIdAndUpdate(id, updateExpenseDto, { new: true }).exec();
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    return expense;
  }

  // Xóa khoản chi
  async remove(id: string): Promise<void> {
    const result = await this.expenseModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Expense not found');
    }
  }

  // tong khoan chi cua 1 user
  async getTotalExpense(userId: string): Promise<number> {
    const expense = await this.expenseModel
      .find({ userId })  // Lọc các khoản thu nhập theo userId
      .exec();

    if (!expense || expense.length === 0) {
      throw new NotFoundException('No income records found for this user');
    }

    // Tính tổng thu nhập
    const totalExpense= expense.reduce((total, expense) => total + expense.amount, 0);
    return totalExpense;
  }

  // Phương thức lấy tất cả chi tiêu của người dùng
  async getExpensesByUser(userId: string): Promise<Expense[]> {
    const expenses = await this.expenseModel.find({ userId }).exec();

    if (!expenses || expenses.length === 0) {
      throw new NotFoundException('No expenses found for this user');
    }

    return expenses;
  }

  // Lấy tổng chi tiêu trong tháng
  async getTotalExpenseByMonth(userId: string, month: number, year: number): Promise<number> {
    const startDate = new Date(year, month - 1, 1); // Ngày đầu tháng
    const endDate = new Date(year, month, 0); // Ngày cuối tháng

    const expenses = await this.expenseModel
      .find({
        userId,
        date: {
          $gte: startDate, // Lớn hơn hoặc bằng ngày đầu tháng
          $lte: endDate,   // Nhỏ hơn hoặc bằng ngày cuối tháng
        },
      })
      .exec();

    if (!expenses || expenses.length === 0) {
      return 0; // Không có chi tiêu trong tháng
    }

    // Tính tổng chi tiêu
    const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);
    return totalExpense;
  }

  // Lấy tổng chi tiêu trong tháng cho một người dùng
  async getTotalExpensesByMonth(userId: string, year: number, month: number): Promise<number> {
    const startDate = new Date(year, month - 1, 1); // Ngày đầu tháng
    const endDate = new Date(year, month, 0); // Ngày cuối tháng

    const expenses = await this.expenseModel
      .find({
        userId,
        date: {
          $gte: startDate, // Ngày bắt đầu tháng
          $lte: endDate,   // Ngày kết thúc tháng
        },
      })
      .exec();

    if (!expenses || expenses.length === 0) {
      return 0; // Không có chi tiêu trong tháng
    }

    // Tính tổng chi tiêu
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    return totalExpenses;
  }

  async getExpensesByMonth(userId: string, year: number, month: number): Promise<Expense[]> {
    const startDate = new Date(year, month - 1, 1); // Start of the month
    const endDate = new Date(year, month, 0); // End of the month

    const expenses = await this.expenseModel
      .find({
        userId,
        date: {
          $gte: startDate, // Greater than or equal to the start of the month
          $lte: endDate,   // Less than or equal to the end of the month
        },
      })
      .exec();

    if (!expenses || expenses.length === 0) {
      throw new NotFoundException('No expenses found for this user in this month');
    }

    return expenses;
  }
}


