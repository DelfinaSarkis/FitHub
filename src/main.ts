import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { auth } from 'express-openid-connect';
import { configAuth } from 'config/Auth0.congug';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const documentConfig = new DocumentBuilder()
    .setTitle('FitHub')
    .setDescription('Documentacion del FitHub: Tu entranador personalizado')
    .addBearerAuth()
    .setVersion('1.0.0')
    .build();
  const documentacion = SwaggerModule.createDocument(app,documentConfig)
  SwaggerModule.setup('api',app,documentacion)
  app.use(auth(configAuth))
  app.useGlobalPipes(new ValidationPipe({whitelist:true})); 
  await app.listen(3000);
  console.log('Server listening on http://localhost:3000');
}
bootstrap();
