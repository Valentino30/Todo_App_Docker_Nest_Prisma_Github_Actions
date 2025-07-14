import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/http-exeption.filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global error handler
  app.useGlobalFilters(new AllExceptionsFilter());

  // Global request validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties not defined in DTOs
      forbidNonWhitelisted: true, // Reject requests with properties not defined in DTOs
      transform: true, // Automatically transform payloads to DTO instances
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('API for your very important todo app')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
