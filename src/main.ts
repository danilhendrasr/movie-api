import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { EntityNotFoundExceptionFilter } from './shared/filters/entity-not-found-exception.filter';

async function bootstrap() {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Movies API')
    .setVersion('1.0')
    .build();

  const app = await NestFactory.create(AppModule);
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  SwaggerModule.setup(
    'docs',
    app,
    SwaggerModule.createDocument(app, swaggerConfig),
  );

  await app.listen(3000);
}
bootstrap();
