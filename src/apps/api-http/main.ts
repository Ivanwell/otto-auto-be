import { NestFactory } from '@nestjs/core';
import { ApiHttpModule } from './api-http.module.js';

async function bootstrap() {
  const app = await NestFactory.create(ApiHttpModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
