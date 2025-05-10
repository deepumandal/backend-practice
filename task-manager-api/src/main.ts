import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { envConfig } from './env';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setDescription('Task Manager API description')
    .addApiKey({
      name: 'apiToken',
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { docExpansion: 'none' },
    customSiteTitle: 'Task Manager API',
  });

  await app.listen(envConfig<string>('PORT') ?? 3000, () => {
    console.log(`Server is running on port ${envConfig<string>('PORT')}`);
  });
}
bootstrap();
