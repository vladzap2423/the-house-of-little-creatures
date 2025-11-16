import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Разрешаем фронтенду обращаться к бэкенду
  app.enableCors({
    origin: ['http://localhost:3000', 'https://localhost:3000'],
    credentials: true,
  });

  const port = process.env.PORT ?? 5000;
  console.log(`🚀 Server running on port ${port}`);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  await app.listen(port);
}
bootstrap();
