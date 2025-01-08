import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto'; // Thêm DTO cho đổi mật khẩu
import { Query } from 'express-serve-static-core';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: mongoose.Model<User>,
    private readonly configService: ConfigService, // Tiêm ConfigService vào constructor
  ) { }

  // Lấy tất cả người dùng
  async findAll(query: Query): Promise<User[]> {
    const resPerPage = 10; // Số lượng người dùng mỗi trang
    const currentPage = Number(query.page) || 1; // Trang hiện tại
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
        name: {
          $regex: query.keyword,
          $options: 'i',
        },
      }
      : {};

    const users = await this.userModel.find({ ...keyword }).limit(resPerPage).skip(skip);
    return users;
  }

  // Tạo người dùng mới
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const username = createUserDto.username;
    const existingUser = await this.userModel.findOne({ username });

    if (existingUser) {
      throw new BadRequestException('Tên tài khoản đã tồn tại!');
    }

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    // Tạo người dùng mới
    const newUser = new this.userModel({
      ...createUserDto,
      role: 0,
      balance: 0,
      avatar: 'default',
      password: hashedPassword,
    });

    return await newUser.save();
  }

  // Cập nhật thông tin người dùng
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID không hợp lệ');
    }

    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true, runValidators: true });

    if (!user) {
      throw new NotFoundException(`Không tìm thấy người dùng với ID: ${id}`);
    }

    return user;
  }

  // Xóa người dùng
  async deleteUser(id: string): Promise<User> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID không hợp lệ');
    }

    const user = await this.userModel.findByIdAndDelete(id);

    if (!user) {
      throw new NotFoundException(`Không tìm thấy người dùng với ID: ${id}`);
    }

    return user;
  }

  // Lấy thông tin người dùng theo ID
  async findUserById(id: string): Promise<User> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID không hợp lệ');
    }

    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException(`Không tìm thấy người dùng với ID: ${id}`);
    }

    return user;
  }

  // Tìm người dùng theo tên đăng nhập
  async findByUsername(username: string): Promise<User | null> {
    return await this.userModel.findOne({ username }).exec();
  }

  // Lấy thông tin người dùng
  async getUserInfo(userId: string): Promise<User> {
    return this.userModel.findById(userId);
  }

  // Cập nhật thông tin người dùng
  async updateUserInfo(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });
  }

  // Cập nhật ảnh đại diện người dùng
  async updateAvatar(userId: string, avatarUrl: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(userId, { avatar: avatarUrl }, { new: true });
  }

  // Đổi mật khẩu người dùng
  async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<void> {
    const { oldPassword, newPassword } = changePasswordDto;
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại');
    }

    const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordCorrect) {
      throw new BadRequestException('Mật khẩu cũ không đúng');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10); // Mã hóa mật khẩu mới
    await this.userModel.findByIdAndUpdate(userId, { password: hashedPassword });
  }
}
