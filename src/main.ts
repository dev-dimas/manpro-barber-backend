import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // const ormConfigPath =
  //   process.env.NODE_ENV === 'production'
  //     ? 'orm.config.ts'
  //     : 'orm.config.dev.ts';

  // const ormConfig = require(`./${ormConfigPath}`);

  const config = new DocumentBuilder()
    .setTitle('Barber App')
    .setDescription('Complete documentation for barber app')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document, {
    customSiteTitle: 'Barber App API',
  });

  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
