import { Injectable } from '@nestjs/common'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}

bootstrap();

@Injectable()
export abstract class BDDRepository{
  abstract create(): void;
  abstract findAll(): void;
  abstract findOne(): void;
  abstract update(): void;
  abstract remove(): void;
}

@Injectable()
export class MysqlRepository implements BDDRepository{
  create(): void {
    throw new Error('Method not implemented.');
  }
  findAll(): void {
    throw new Error('Method not implemented.');
  }
  findOne(): void {
    throw new Error('Method not implemented.');
  }
  update(): void {
    throw new Error('Method not implemented.');
  }
  remove(): void {
    throw new Error('Method not implemented.');
  }
}
