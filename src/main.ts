import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  app.enableCors();

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT') || 3000;

  await app.listen(PORT, () => {
    console.log(`Listening on ${PORT} port`);
  });
}
bootstrap();
