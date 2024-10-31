import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api') // Добавление api автоматически к запросам (localhost:4200/api)
  app.use(cookieParser()) // подключает middleware для обработки cookies
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
    exposedHeaders: 'set-cookie'
  })

  await app.listen(4200);
}
bootstrap();
