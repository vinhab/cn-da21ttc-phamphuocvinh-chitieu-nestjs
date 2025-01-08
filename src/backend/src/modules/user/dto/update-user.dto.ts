import { IsString, IsOptional, IsNumber} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsNumber()
  @IsOptional()
  role?: number;

  @IsNumber()
  @IsOptional()
  balance?: number;
}
