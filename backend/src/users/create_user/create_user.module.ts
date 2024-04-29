import { Module } from '@nestjs/common';
import { CreateUserService } from './create_user.service';
import { CreateUserController } from './create_user.controller';

@Module({
  controllers: [CreateUserController],
  providers: [CreateUserService],
})
export class CreateUserModule {}
