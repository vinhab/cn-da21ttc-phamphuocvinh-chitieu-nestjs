import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';

export class UpdateExpenseDto {
  @IsString()
  @IsOptional()
  categoryId: string;  // Optional, can be updated

  @IsNumber()
  @IsOptional()
  amount: number;  // Optional, can be updated

  @IsString()
  @IsOptional()
  description: string;  // Optional, can be updated

  @IsDate()
  @IsOptional()
  date: Date;  // Optional, can be updated
}
