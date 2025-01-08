import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ConfigService } from '@nestjs/config';


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService, private readonly configService: ConfigService,) { }

    @Get()
    async getAllUsers(@Query() query: ExpressQuery): Promise<User[]> {
        return this.userService.findAll(query);
    };

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);
    };

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.updateUser(id, updateUserDto);
    };

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<User> {
        return this.userService.deleteUser(id);
    };

    @Get(':id')
    async findUserById(@Param('id') id: string): Promise<User> {
        return this.userService.findUserById(id);
    };

    // Cập nhật ảnh đại diện người dùng
    @Put(':id/avatar')
    @UseInterceptors(FileInterceptor('file'))
    async updateAvatar(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File
    ) {
        // Lấy đường dẫn ảnh từ file được tải lên
        const avatarUrl = `${this.configService.get('UPLOADS_BASE_URL')}/${file.filename}`;
        
        return this.userService.updateAvatar(id, avatarUrl);
    }

    // Đổi mật khẩu người dùng
    @Put(':id/password')
    async changePassword(@Param('id') id: string, @Body() changePasswordDto: ChangePasswordDto): Promise<void> {
        return this.userService.changePassword(id, changePasswordDto);
    }
}
