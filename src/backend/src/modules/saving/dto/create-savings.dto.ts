import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateSavingsDto {
  @IsNumber()
  targetAmount: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional() // Đánh dấu là trường tùy chọn
  @IsNumber()   // Kiểm tra kiểu số nếu có giá trị
  currentAmount?: number;

  @IsString()
  userId: string;

  @IsNumber()
  month: number;

  @IsNumber()
  year: number;
}
