import { NestFactory } from '@nestjs/core';
import { productFromJson } from '~features/products/application/product_mapper'
import { AppModule } from './app.module';

async function bootstrap() {
  const p = productFromJson({
    id: '9c5d0f9a-9c6e-4a2b-8e4d-2a7e3d2e0a5e',
    code: 'code',
    name: 'name',
    description: '',
    create_at: new Date(),
    brand: 'brand',
    price: 10,
    image_url: 'image_url',
    stock: 10,
    rank: 10
  })

  console.log("p")
  console.log(p)

  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}

bootstrap();

