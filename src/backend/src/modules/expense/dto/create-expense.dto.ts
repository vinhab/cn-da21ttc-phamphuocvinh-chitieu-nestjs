import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDate } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  userId: string;  // The user to which this expense belongs

  @IsString()
  @IsNotEmpty()
  categoryId: string;  // The category for the expense (e.g., food, transport, etc.)

  @IsNumber()
  @IsNotEmpty()
  amount: number;  // The amount spent

  @IsString()
  @IsOptional()
  description: string;  // Optional description of the expense
}
