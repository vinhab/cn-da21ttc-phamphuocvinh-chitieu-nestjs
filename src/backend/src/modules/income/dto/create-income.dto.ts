import { IsNotEmpty, IsOptional, IsNumber, IsDateString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateIncomeDto {
  @IsNotEmpty()
  userId: Types.ObjectId;

  @IsNotEmpty()
  sourceId: Types.ObjectId;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;
}
