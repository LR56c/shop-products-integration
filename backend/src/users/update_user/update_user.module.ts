import { Module } from '@nestjs/common';
import { UpdateUserService } from './update_user.service';
import { UpdateUserController } from './update_user.controller';

@Module({
  controllers: [UpdateUserController],
  providers: [UpdateUserService],
})
export class UpdateUserModule {}
