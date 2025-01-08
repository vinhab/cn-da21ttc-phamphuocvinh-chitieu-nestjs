import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 4200;

  app.useGlobalPipes(new ValidationPipe());

  // Kích hoạt CORS và cấu hình
  app.enableCors({
    origin: 'http://localhost:5173', // Chỉ cho phép từ frontend
    credentials: true, // Cho phép gửi cookie nếu cần
  });
  
  console.log(`Server running at: http:\\\\localhost:${port}`)
  await app.listen(port);
}
bootstrap();
