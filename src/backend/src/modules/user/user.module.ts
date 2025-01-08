import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [MulterModule.register({
    dest: './uploads', // Thư mục lưu trữ ảnh tải lên
    limits: {
      fileSize: 10 * 1024 * 1024, // Giới hạn dung lượng ảnh tối đa (10MB)
    },
  }),MongooseModule.forFeature([{ name: User.name, schema: UserSchema}]), ConfigModule],
  exports: [UserService]
})

export class UserModule {}
