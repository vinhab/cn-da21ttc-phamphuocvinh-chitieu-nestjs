import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Income } from './schemas/income.schema';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';

@Injectable()
export class IncomeService {
  constructor(@InjectModel(Income.name) private readonly incomeModel: Model<Income>) {}

  async create(createIncomeDto: CreateIncomeDto): Promise<Income> {
    const newIncome = new this.incomeModel(createIncomeDto);
    return newIncome.save();
  }

  async findAll(): Promise<Income[]> {
    return this.incomeModel.find().populate('userId').populate('sourceId').exec();
  }

  async findOne(id: string): Promise<Income> {
    const income = await this.incomeModel.findById(id).populate('userId').populate('sourceId').exec();
    if (!income) throw new NotFoundException(`Income with ID ${id} not found`);
    return income;
  }

  async update(id: string, updateIncomeDto: UpdateIncomeDto): Promise<Income> {
    const updatedIncome = await this.incomeModel
      .findByIdAndUpdate(id, updateIncomeDto, { new: true })
      .exec();
    if (!updatedIncome) throw new NotFoundException(`Income with ID ${id} not found`);
    return updatedIncome;
  }

  async remove(id: string): Promise<void> {
    const result = await this.incomeModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Income with ID ${id} not found`);
  }

   // Phương thức lấy tất cả thu nhậph của người dùng
    async getImcomesByUser(userId: string): Promise<Income[]> {
      const imcomes = await this.incomeModel.find({ userId }).exec();
  
      if (!imcomes || imcomes.length === 0) {
        throw new NotFoundException('No imcomes found for this user');
      }
  
      return imcomes;
    }

    // tong khoan chi cua 1 user
  async getTotalImcome(userId: string): Promise<number> {
    const income = await this.incomeModel
      .find({ userId })  // Lọc các khoản thu nhập theo userId
      .exec();

    if (!income || income.length === 0) {
      throw new NotFoundException('No income records found for this user');
    }

    // Tính tổng thu nhập
    const totalIncome = income.reduce((total, income) => total + income.amount, 0);
    return totalIncome;
  }

  // Lấy tổng thu nhập trong tháng
  async getTotalIncomeByMonth(userId: string, month: number, year: number): Promise<number> {
    const startDate = new Date(year, month - 1, 1); // Ngày đầu tháng
    const endDate = new Date(year, month, 0); // Ngày cuối tháng

    const incomes = await this.incomeModel
      .find({
        userId,
        date: {
          $gte: startDate, // Lớn hơn hoặc bằng ngày đầu tháng
          $lte: endDate,   // Nhỏ hơn hoặc bằng ngày cuối tháng
        },
      })
      .exec();

    if (!incomes || incomes.length === 0) {
      return 0; // Không có thu nhập trong tháng
    }

    // Tính tổng thu nhập
    const totalIncome = incomes.reduce((total, income) => total + income.amount, 0);
    return totalIncome;
  }

  async getTotalIcomeYearAndMoth(userId: string, year: number, month: number): Promise<number> {
    const startDate = new Date(year, month - 1, 1); // First day of the month
    const endDate = new Date(year, month, 0); // Last day of the month
  
    const incomes = await this.incomeModel
      .find({
        userId,
        date: {
          $gte: startDate, // Greater than or equal to the start date
          $lte: endDate,   // Less than or equal to the end date
        },
      })
      .exec();
  
    if (!incomes || incomes.length === 0) {
      return 0; // No income for the specified month
    }
  
    // Sum the amount field for all income records
    const totalIncome = incomes.reduce((total, income) => total + income.amount, 0);
    return totalIncome;
  }

  async getIncomesByMonth(userId: string, year: number, month: number): Promise<Income[]> {
      const startDate = new Date(year, month - 1, 1); // Start of the month
      const endDate = new Date(year, month, 0); // End of the month
  
      const incomes = await this.incomeModel
        .find({
          userId,
          date: {
            $gte: startDate, // Greater than or equal to the start of the month
            $lte: endDate,   // Less than or equal to the end of the month
          },
        })
        .exec();
  
      if (!incomes || incomes.length === 0) {
        throw new NotFoundException('No incomes found for this user in this month');
      }
  
      return incomes;
    }
}
