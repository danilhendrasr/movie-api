import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { globalFilters } from './shared/constants';

async function bootstrap() {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Movies API')
    .setVersion('1.0')
    .build();

  const app = await NestFactory.create(AppModule);
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(...globalFilters);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  SwaggerModule.setup(
    'docs',
    app,
    SwaggerModule.createDocument(app, swaggerConfig),
  );

  app.enableShutdownHooks();
  await app.listen(3000);
}
bootstrap();
