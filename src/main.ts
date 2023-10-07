import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './guard/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from './guard/role.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(
    new AuthGuard(new JwtService(), new Reflector()),
    new RolesGuard(new Reflector()),
  );
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Barber App')
    .setDescription('Complete documentation for barber app')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document, {
    customSiteTitle: 'Barber App API',
  });

  await app.listen(3000);
}
bootstrap();
