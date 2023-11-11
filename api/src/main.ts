import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('Start application');
  const app = await NestFactory.create(AppModule, { cors: false });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

  try {
    app.setGlobalPrefix('api');
    await app.listen(process.env.PORT || 3000);
  } catch (error) {
    console.error(error);
  }
}
bootstrap();
