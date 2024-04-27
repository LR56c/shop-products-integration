import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerModule
} from '@nestjs/swagger'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // console.log(new Date().toJSON())
  // const a = Date.parse("2024-04-27T18:31:17.788Z")
  // console.log(new Date(a))

  const config = new DocumentBuilder()
    .setTitle('Shop API')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000)
}

bootstrap();

