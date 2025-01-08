import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    name: string;  // Tên người dùng
  
    @IsString()
    @IsNotEmpty()
    username: string;  // Tên đăng nhập (username)
  
    @IsString()
    @IsNotEmpty()
    password: string;  // Mật khẩu
  
    @IsOptional()  // Không bắt buộc nhập
    role: number;  // Vai trò người dùng, mặc định có thể là 0 (User)
  
    @IsOptional()  // Không bắt buộc nhập
    balance: number;  // Số dư tài khoản của người dùng, mặc định là 0
  
    @IsOptional()  // Không bắt buộc nhập
    avatar: string;  // URL ảnh đại diện, mặc định có thể là một URL mặc định
}