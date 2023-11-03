import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { logger } from 'middleware/logger';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('chats demo')
    .setDescription('The chats API description')
    .setVersion('1.0')
    .addTag('chats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.useStaticAssets('static', {
    prefix: '/public/'
  })
  app.use(logger)

  await app.listen(3000);
}
bootstrap();
