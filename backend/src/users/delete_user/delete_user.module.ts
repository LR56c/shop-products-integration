import { Module } from '@nestjs/common';
import { DeleteUserService } from './delete_user.service';
import { DeleteUserController } from './delete_user.controller';

@Module({
  controllers: [DeleteUserController],
  providers: [DeleteUserService],
})
export class DeleteUserModule {}
