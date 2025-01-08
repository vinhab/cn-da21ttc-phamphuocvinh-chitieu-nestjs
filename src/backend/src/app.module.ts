import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './modules/category/categories.module';
import { ExpenseModule } from './modules/expense/expense.module';
import { SourcesModule } from './modules/source/sources.module';
import { IncomeModule } from './modules/income/income.module';  // Đảm bảo IncomeModule đã được import
import { SavingsGoalModule } from './modules/saving/savings.module';
import { DataController } from './data/data.controller';
import { MonthlySummaryModule } from './modules/monthly-summary/monthly-summary.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MulterModule.register({
      dest: './uploads', // Thư mục nơi các file sẽ được lưu trữ
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Thư mục chứa các tệp tải lên
      serveRoot: '/uploads', // URL gốc mà frontend sẽ sử dụng
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UserModule,
    AuthModule,
    CategoriesModule,
    ExpenseModule,
    SourcesModule,
    IncomeModule,  // Đảm bảo IncomeModule đã được import
    SavingsGoalModule,
    MonthlySummaryModule,
  ],
  controllers: [AppController, DataController],
  providers: [AppService],
})
export class AppModule {}
